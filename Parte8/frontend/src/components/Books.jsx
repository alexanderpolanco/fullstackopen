import { useQuery } from "@apollo/client/react";
import { GET_ALL_BOOKS } from '../api/graphql/queries/getAllBooks.query';

const Books = (props) => {
  if (!props.show) {
    return null
  }

  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  const books = data?.allBooks || [];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error :</p>
      ) : null}
    </div>
  )
}

export default Books
