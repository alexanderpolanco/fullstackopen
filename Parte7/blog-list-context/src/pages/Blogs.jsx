import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import FormAddBlogs from "../components/FormAddBlogs";
import Togglable from "../components/Togglable";
import Blog from "../components/Blog";
import { getAllBlogs } from "../services/blogs";
import { useStore } from "../context/globalContext";

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

export default function Blogs() {
  const {
    state: { session },
  } = useStore();

  const toggleFormRef = useRef();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
  });

  return (
    <div className="container-blog">
      <Togglable buttonLabel="create new blog" ref={toggleFormRef}>
        <FormAddBlogs stateSession={session} toggleFormRef={toggleFormRef} />
      </Togglable>
      <div>
        {result.isLoading && <div>loading data...</div>}
        {result.isError && (
          <span>blogs service not available due to problems in server</span>
        )}
        {result.data && (
          <div>
            <h2>Blogs</h2>
            {orderBlogs(result.data).map((blog) => (
              <Blog key={blog.id} blog={blog} session={session} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
