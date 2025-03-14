const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.title) {
    return response.status(400).json({ error: "missing title" });
  }

  if (!request.body.url) {
    return response.status(400).json({ error: "missing url" });
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
  });
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
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
