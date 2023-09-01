const BlogForm = ({
  onSubmit,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </div>
    </form>
  );
};

export default BlogForm;
