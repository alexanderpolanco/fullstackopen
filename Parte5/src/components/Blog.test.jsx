import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "Component testing is done with react-testing-library",
  author: "Michael Chan",
  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/Testing-UI.html",
  likes: 7,
  user: {
    name: "Michael",
    username: "michael.chan",
  },
};

const session = {
  username: "michael.chan",
};

const handleClickLike = async (blog, updateBlogs, putBlog) => {
  const updatedBlog = { ...blog, likes: blog.likes + 1 };

  if ("user" in updatedBlog) {
    delete updatedBlog.user;
  }

  const response = await putBlog(updatedBlog);
  if (response) {
    updateBlogs();
  }
};

test("renders content", () => {
  render(
    <Blog
      blog={blog}
      session={session}
      updateBlogs={() => {}}
      handleClickLike={handleClickLike}
    />
  ).container;
  const title = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(title).toBeDefined();

  const author = screen.getByText("Michael Chan");
  expect(author).toBeDefined();

  const element = screen.getByTestId("post");
  expect(element).toHaveStyle("display: none");
});

test("renders url and likes", async () => {
  const user = userEvent.setup();

  render(
    <Blog
      blog={blog}
      session={session}
      updateBlogs={() => {}}
      handleClickLike={handleClickLike}
    />
  );

  const button = screen.getByText("view");
  await user.click(button);

  const element = screen.getByTestId("post");
  expect(element).not.toHaveStyle("display: none");

  const url = screen.getByText(
    "http://blog.cleancoder.com/uncle-bob/2017/05/05/Testing-UI.html"
  );
  expect(url).toBeDefined();

  const likes = screen.getByText("likes 7");
  expect(likes).toBeDefined();
});

test("clicking the like button calls event handler twice", async () => {
  const user = userEvent.setup();
  const mockHandler = vi.fn();

  render(
    <Blog
      blog={blog}
      session={session}
      updateBlogs={() => {}}
      handleClickLike={mockHandler}
    />
  );

  const button = screen.getByText("view");
  await user.click(button);

  const buttonLike = screen.getByText("like");
  await user.click(buttonLike);
  await user.click(buttonLike);

  expect(mockHandler.mock.calls).toHaveLength(2);
});