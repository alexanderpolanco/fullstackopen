import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormAddBlogs from "./FormAddBlogs";

test("You must call the event handler and check that the form data is correct.", async () => {
  const handleClickCreate = vi.fn();
  const user = userEvent.setup();

  render(<FormAddBlogs handleClickCreate={handleClickCreate} />);
  
  const inputTitle = screen.getByLabelText("title");
  const inputAuthor = screen.getByLabelText("author");
  const inputUrl = screen.getByLabelText("url");

  const button = screen.getByText("create");
  
  await user.type(inputTitle, "Component testing is done with react-testing-library");
  await user.type(inputAuthor, "Michael Chan");
  await user.type(
    inputUrl,
    "http://blog.cleancoder.com/uncle-bob/2017/05/05/Testing-UI.html"
  );

  await user.click(button);

  expect(handleClickCreate.mock.calls).toHaveLength(1);
  
  expect(handleClickCreate.mock.calls[0][0].target[0].value).toBe(
    "Component testing is done with react-testing-library"
  );
  
  expect(handleClickCreate.mock.calls[0][0].target[1].value).toBe(
    "Michael Chan"
  );
  expect(handleClickCreate.mock.calls[0][0].target[2].value).toBe(
    "http://blog.cleancoder.com/uncle-bob/2017/05/05/Testing-UI.html"
  );
  
});
