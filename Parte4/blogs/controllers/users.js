const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

usersRouter.get("/:id", async (request, response) => {
  const { id } = request.params
  const user = await User.findById(id).populate("blogs");
  response.json(user);
});


usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;

  if (typeof password === "undefined") {
    throw new Error("Password is required");
  }

  if (password.trim().length < 3) {
    throw new Error("Password must be at least 3 characters long");
  }

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

if (process.env.NODE_ENV === "test") {
  usersRouter.delete("/testing/reset", async (request, response) => {
    const users = await User.deleteMany({});
    response.json(users);
  });
}

module.exports = usersRouter;
