import { NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../services/users";

export default function Users() {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return (
    <div className="container-page">
      <h2 className="title-page">Users</h2>
      {result.isLoading && <div>loading data...</div>}
      {result.isError && (
        <span>blogs service not available due to problems in server</span>
      )}
      {result.data && (
        <table className="table-users">
          <thead>
            <tr>
              <th></th>
              <th align="center">blogs created</th>
            </tr>
          </thead>
          <tbody>
            {result.data.map((user) => (
              <tr className="tr">
                <td className="td">
                  <NavLink to={`/users/${user.id}`}>{user.name}</NavLink>
                </td>
                <td className="td" align="center">
                  {user.blogs.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
