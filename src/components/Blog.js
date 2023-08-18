import { useState } from "react";
import blogService from "./../services/blogs";

const Blog = ({ blog, blogs, setBlogs, user, toggleVisibility }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [detailsVisible, setDetailsVisible] = useState(false);
  const showWhenVisible = { display: detailsVisible ? "" : "none" };

  const buttonLabel = detailsVisible ? "hide" : "view";

  const handleToggleVisibility = () => {
    toggleVisibility();
    setDetailsVisible(!detailsVisible);
  };

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.addLike({
        ...blog,
        likes: blog.likes + 1,
      });
      setBlogs(prevBlogs =>
        prevBlogs.map(prevBlog =>
          prevBlog.id === updatedBlog.id ? updatedBlog : prevBlog
        )
      );
    } catch (error) {
      console.log("Error updating likes", error);
    }
  };

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog);
        setBlogs(blogs.filter(b => b.id !== blog.id));
      } catch (error) {
        console.log("Error removing blog", error);
      }
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => handleToggleVisibility()}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button
            onClick={() => {
              handleLike();
            }}
          >
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username && (
          <button onClick={() => handleRemove()}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
