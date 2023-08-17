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
