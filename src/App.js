import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState("");

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, [blogs]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notify = (message, type = "info") => {
    setInfo({ message, type });

    setTimeout(() => {
      setInfo({ message: null, type: info.type });
    }, 4000);
  };

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
          info={info}
        />
      </div>
    );
  };

  const createBlogForm = () => (
    <div>
      <h2>create new</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          onSubmit={handleCreateBlog}
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Togglable>
    </div>
  );

  const blogForm = () => (
    <div>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
      ))}
    </div>
  );

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      notify("wrong username or password", "error");
      setUsername("");
      setPassword("");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const handleCreateBlog = async event => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, author, url });
      setTitle("");
      setAuthor("");
      setUrl("");
      blogFormRef.current.toggleVisibility();
      setBlogs([...blogs, newBlog]);
      notify(`a new blog ${title} by ${author} added`, "info");
    } catch (exception) {
      notify(`creation failed`, "error");
      setTitle("");
      setAuthor("");
      setUrl("");
    }
  };

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          {<Notification info={info} />}
          <p>
            {user.name} logged in<button onClick={handleLogout}>logout</button>
          </p>
          {createBlogForm()}
          {blogForm()}
        </div>
      )}
    </div>
  );
};
export default App;
