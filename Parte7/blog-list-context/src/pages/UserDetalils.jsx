import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/users";

export default function UserDetalils() {
  const params = useParams();

  const result = useQuery({
    queryKey: ["user", params.idUser],
    queryFn: () => getUser(params.idUser),
  });

  return (
    <div className="container-details-user">
      {result.isLoading && <div>loading data...</div>}
      {result.isError && (
        <span>user service not available due to problems in server</span>
      )}
      {result.data && (
        <div className="details-user">
          <h2 className="title-page">{result.data.name}</h2>
          <h3>Added blogs</h3>
          <ul>
            {result.data.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
