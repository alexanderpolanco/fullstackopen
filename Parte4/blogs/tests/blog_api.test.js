const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/blog");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const api = supertest(app);

let createdUser;
let token;
let newBlog;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  createdUser = await user.save();

  const initialPosts = {
    title: "blog1",
    author: "Autor de prueba",
    url: "https://es.wikipedia.org/wiki/Blog",
    likes: 5,
    user: createdUser.id,
  };

  let blogObject = new Blog(initialPosts);
  newBlog = await blogObject.save();

  //loguearse con el usuario para obtener un token
  const loginResponse = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  token = loginResponse.body.token;
});

test("return a post", async () => {
  const result = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  assert.strictEqual(result.body.length, 1);
});

test("id exists", async () => {
  const result = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.ok(result.body[0].id, "ID should exist");
});

test("create a new blog post", async () => {
  const newPost = {
    title: "Nuevo Blog",
    author: "Nuevo Autor",
    url: "https://es.wikipedia.org/wiki/NuevoBlog",
    likes: 10,
  };

  const blogsBefore = await api.get("/api/blogs");
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfter = await api.get("/api/blogs");

  assert.strictEqual(blogsAfter.body.length, blogsBefore.body.length + 1);

  const createdPost = blogsAfter.body.find(
    (post) => post.title === newPost.title
  );
  assert.strictEqual(createdPost.title, newPost.title);
});

test("likes defaults to 0 if missing", async () => {
  const newPostWithoutLikes = {
    title: "Nuevo Blog Sin Likes",
    author: "Autor Desconocido",
    url: "https://es.wikipedia.org/wiki/BlogSinLikes",
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newPostWithoutLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0, "The likes should default to 0");
});

test("should return 400 Bad Request if title is missing", async () => {
  const newPostWithoutTitle = {
    author: "Autor Desconocido",
    url: "https://es.wikipedia.org/wiki/BlogSinTitle",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newPostWithoutTitle)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("should return 400 Bad Request if url is missing", async () => {
  const newPostWithoutUrl = {
    title: "Nuevo Blog Sin URL",
    author: "Autor Desconocido",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newPostWithoutUrl)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("should update a post", async () => {
  const blogsBefore = await api.get("/api/blogs");
  const postToUpdate = blogsBefore.body[0];

  const newPost = {
    title: "Nuevo Título",
    author: "Nuevo Autor",
    url: "https://es.wikipedia.org/wiki/NuevoBlog",
    likes: 10,
  };

  await api
    .put(`/api/blogs/${postToUpdate.id}`)
    .send(newPost)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAfter = await api.get("/api/blogs");

  assert.strictEqual(blogsAfter.body.length, blogsBefore.body.length);

  const updatedPost = blogsAfter.body.find(
    (post) => post.id === postToUpdate.id
  );

  assert.strictEqual(updatedPost.title, newPost.title);
});

test("should update the likes of a post", async () => {
  const blogsBefore = await api.get("/api/blogs");
  const postToUpdate = blogsBefore.body[0];

  const updatedLikes = { likes: postToUpdate.likes + 1 };

  await api
    .put(`/api/blogs/${postToUpdate.id}`)
    .send(updatedLikes)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAfter = await api.get("/api/blogs");
  const updatedPost = blogsAfter.body.find(
    (post) => post.id === postToUpdate.id
  );

  assert.strictEqual(
    updatedPost.likes,
    postToUpdate.likes + 1,
    "Likes count should be updated correctly"
  );
});

test("should delete a post", async () => {
  const blog = await api.get(`/api/blogs/${newBlog.id}`);
  const postToDelete = blog.body.id;

  await api
    .delete(`/api/blogs/${postToDelete}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200);

  const blogsAfter = await api.get("/api/blogs");

  const deletedPost = blogsAfter.body.find((post) => post.id === postToDelete);

  assert.strictEqual(deletedPost, undefined);
});

after(async () => {
  await mongoose.connection.close();
});
