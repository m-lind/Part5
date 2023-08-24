import { useState } from "react";
import blogService from "./../services/blogs";
const Blog = ({ blog, user, handleRemove, handleLike }) => {
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

  const handleLikeClick = async () => {
    try {
      const updatedBlog = await blogService.addLike({
        ...blog,
        likes: blog.likes + 1,
      });
      handleLike(updatedBlog);
    } catch (error) {
      console.log("Error updating likes", error);
    }
  };

  const handleRemoveClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(blog);
        handleRemove(blog.id);
      } catch (error) {
        console.log("Error removing blog", error);
      }
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => toggleVisibility()}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleLikeClick}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username && (
          <button onClick={handleRemoveClick}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
