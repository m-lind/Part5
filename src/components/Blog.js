import { useState } from "react";

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

  const handleLikeClick = () => {
    handleLike(blog);
  };

  const handleRemoveClick = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleRemove(blog);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <button onClick={() => toggleVisibility()}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} data-testid="togglableContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={handleLikeClick} id="like-button">
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        {blog.user.username === user.username && (
          <button onClick={handleRemoveClick} id="remove-button">
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
