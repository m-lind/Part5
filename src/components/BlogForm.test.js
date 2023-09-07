import React from "react";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and call onSubmit", async () => {
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByTestId("title-input");
  expect(titleInput).toBeDefined();
  const authorInput = screen.getByTestId("author-input");
  const urlInput = screen.getByTestId("url-input");

  const submitButton = screen.getByText("create");

  await userEvent.type(titleInput, "Test Title");
  await userEvent.type(authorInput, "Test Author");
  await userEvent.type(urlInput, "www.test.fi");

  await userEvent.click(submitButton);

  expect(createBlog).toHaveBeenCalledTimes(1);

  expect(createBlog.mock.calls[0][0].title).toBe("Test Title");
  expect(createBlog.mock.calls[0][0].author).toBe("Test Author");
  expect(createBlog.mock.calls[0][0].url).toBe("www.test.fi");
});
