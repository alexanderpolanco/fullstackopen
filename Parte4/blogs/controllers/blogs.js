const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user");
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  if (request.decodedToken === null || !request.decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  if (!request.body.title) {
    return response.status(400).json({ error: "missing title" });
  }

  if (!request.body.url) {
    return response.status(400).json({ error: "missing url" });
  }

  const user = await User.findById(request.decodedToken.id);

  if (!user) {
    throw new Error("user not found");
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id,
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  if (request.decodedToken === null || !request.decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  if (blog.user.toString() !== request.decodedToken.id.toString()) {
    return response.status(401).json({ error: "unauthorized" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(200).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const post = request.body;

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, post, {
    new: true,
  });

  response.json(updatedNote);
});

module.exports = blogsRouter;
