import { useQuery } from "@apollo/client/react";
import { GET_ALL_BOOKS } from '../api/graphql/queries/getAllBooks.query';
import { GET_ME } from '../api/graphql/queries/getMe.query';

const Recommendations = ({ show }) => {
  const { loading, error, data } = useQuery(GET_ALL_BOOKS);

  const { loading: loadingMe, error: errorMe, data: dataMe } = useQuery(GET_ME);

  const books = data?.allBooks;
  const me = dataMe?.me;

  let booksFiltrados = []

  if (me && books) {
    booksFiltrados = books.filter((b) => b.genres.includes(me.favoriteGenre))
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>Books in your favorite genre <strong>{me?.favoriteGenre || 'all'}</strong></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksFiltrados.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading || loadingMe ? (
        <p>Loading...</p>
      ) : error || errorMe ? (
        <p>Error :</p>
      ) : null}
    </div>
  )
}

export default Recommendations
