import { createSlice } from "@reduxjs/toolkit";
import { showNotification } from "../reducers/notificationReducer";
import { getAll, postBlog, putBlog, eraseBlog } from "../services/blogs";

const blogsAtStart = [];

const getId = () => (100000 * Math.random()).toFixed(0);

const orderBlogs = (blogs) => {
  return blogs.sort((a, b) => {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  });
};

const asObject = () => {
  return {
    id: getId(),
    content: "",
    title: "",
    url: "",
    likes: "",
    author: "",
  };
};

const initialState = blogsAtStart.map(asObject);

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    addBlog(state, action) {
      const content = action.payload;
      return [...state, content];
    },
    addLike(state, action) {
      const id = action.payload;
      const newState = state.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog,
      );
      const blogsOrdered = orderBlogs(newState);
      return blogsOrdered;
    },
    delBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id && blog);
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { addBlog, addLike, appendBlog, setBlogs, delBlog } =
  blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const { data } = await getAll();
    const blogsOrdered = orderBlogs(data);
    dispatch(setBlogs(blogsOrdered));
  };
};

export const newLike = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const { data } = await putBlog(updatedBlog);
    dispatch(addLike(data.id));
  };
};

export const deleteBlog = (data) => {
  const { blog, token } = data;
  return async (dispatch) => {
    const response = await eraseBlog(blog.id, token);
    if (response) {
      dispatch(delBlog(blog.id));
    }
  };
};

export const createBlog = (content, token) => {
  return async (dispatch) => {
    const { data } = await postBlog(content, token);
    dispatch(appendBlog(data));

    dispatch(
      showNotification(
        {
          description: `a new blog ${data.title} ${data.author}`,
          type: "success",
        },
        5,
      ),
    );
  };
};

export default blogsSlice.reducer;
