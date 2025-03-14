const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const Blog = require("../models/blog");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

const api = supertest(app);

const initialPosts = [
  {
    title: "blog1",
    author: "Autor de prueba",
    url: "https://es.wikipedia.org/wiki/Blog",
    likes: 5,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let noteObject = new Blog(initialPosts[0]);
  await noteObject.save();
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
    .send(newPost)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAfter = await api.get("/api/blogs");

  assert.strictEqual(blogsAfter.body.length, blogsBefore.body.length + 1);

  const createdPost = blogsAfter.body.find(
    (post) => post.title === newPost.title
  );

  assert.deepEqual(createdPost, {
    ...newPost,
    id: createdPost.id,
  });
});

test("likes defaults to 0 if missing", async () => {
  const newPostWithoutLikes = {
    title: "Nuevo Blog Sin Likes",
    author: "Autor Desconocido",
    url: "https://es.wikipedia.org/wiki/BlogSinLikes",
  };

  const response = await api
    .post("/api/blogs")
    .send(newPostWithoutLikes)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0, "The likes should default to 0");
});

test("should return 400 Bad Request if title is missing", async () => {
  const newPostWithoutTitle = {
    author: "Autor Desconocido",
    url: "https://es.wikipedia.org/wiki/BlogSinTitle",
  };

  await api
    .post("/api/blogs")
    .send(newPostWithoutTitle)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("should return 400 Bad Request if url is missing", async () => {
  const newPostWithoutUrl = {
    title: "Nuevo Blog Sin URL",
    author: "Autor Desconocido",
  };

  await api
    .post("/api/blogs")
    .send(newPostWithoutUrl)
    .expect(400)
    .expect("Content-Type", /application\/json/);
});

test("should delete a post", async () => {
  const blogsBefore = await api.get("/api/blogs");
  const postToDelete = blogsBefore.body[0];

  await api
    .delete(`/api/blogs/${postToDelete.id}`)
    .expect(200)

  const blogsAfter = await api.get("/api/blogs");

  assert.strictEqual(blogsAfter.body.length, blogsBefore.body.length - 1);

  const deletedPost = blogsAfter.body.find(
    (post) => post.id === postToDelete.id
  );

  assert.strictEqual(deletedPost, undefined);
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

  assert.deepEqual(updatedPost, {
    ...newPost,
    id: updatedPost.id,
  });
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
  const updatedPost = blogsAfter.body.find(post => post.id === postToUpdate.id);

  assert.strictEqual(updatedPost.likes, postToUpdate.likes + 1, "Likes count should be updated correctly");
});

after(async () => {
  await mongoose.connection.close();
});