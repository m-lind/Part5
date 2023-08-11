import { useState } from "react";
import blogService from "./../services/blogs";

const Blog = ({ blog, setBlogs }) => {
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

  const toggleVisibility = () => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => toggleVisibility()}>{buttonLabel}</button>
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
      </div>
    </div>
  );
};

export default Blog;
