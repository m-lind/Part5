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

describe("url, number of likes and user is shown only after view button is pressed", () => {
  let container;
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

  beforeEach(() => {
    container = render(
      <Blog blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} />
    ).container;
  });

  test("at start the children are not displayed", () => {
    const div = container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", async () => {
    const userSetup = userEvent.setup();
    const button = screen.getByText("view");
    await userSetup.click(button);

    const div = container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");

    const urlElement = screen.getByText(blog.url);
    const likesElement = screen.getByText(`likes ${blog.likes}`);
    const userElement = screen.getByText(blog.user.name);

    expect(urlElement).toBeDefined();
    expect(likesElement).toBeDefined();
    expect(userElement).toBeDefined();
  });
});
