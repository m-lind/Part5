import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders title", () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    url: "test.url",
    user: {
      name: "Test user",
      username: "testusername",
    },
  };
  const blogs = [];
  const setBlogs = () => {};
  const user = { username: "testusername" };

  render(<Blog blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />);

  const element = screen.getByText("Test title", { exact: false });
  expect(element).toBeDefined();
});

test("url, number of likes and user is shown when view button is pressed", async () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    url: "test.url",
    likes: 5,
    user: {
      name: "Test user",
      username: "testusername",
    },
  };
  const blogs = [];
  const setBlogs = () => {};
  const user = { username: "testusername" };

  const mockHandler = jest.fn();

  render(
    <Blog
      blog={blog}
      blogs={blogs}
      setBlogs={setBlogs}
      user={user}
      toggleVisibility={mockHandler}
    />
  );

  const userSetup = userEvent.setup();
  const button = screen.getByText("view");
  await userSetup.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);

  const urlElement = screen.getByText(blog.url);
  const likesElement = screen.getByText(`likes ${blog.likes}`);
  const userElement = screen.getByText(blog.user.name);

  expect(urlElement).toBeInTheDocument();
  expect(likesElement).toBeInTheDocument();
  expect(userElement).toBeInTheDocument();
});
