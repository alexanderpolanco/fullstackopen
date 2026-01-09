import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_BOOKS } from '../api/graphql/queries/getAllBooks.query';

const Books = (props) => {
  const [genre, setGenre] = useState('all');


  const handleGenreClick = (genre) => {
    setGenre(genre)
  }

  const { loading, error, data } = useQuery(GET_ALL_BOOKS, {
    variables: {
      genre: genre === "all" ? null : genre
    }
  });

  let generos = []

  let books = data?.allBooks || [];

  generos = books.map((b) => b.genres).flat()
  generos = Array.from(new Set(generos)).sort()

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <div>in genre <strong>{genre}</strong></div>
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
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {generos.map((g) => (
          <button key={g} onClick={() => handleGenreClick(g)}>{g}</button>
        ))}
        <button onClick={() => handleGenreClick('all')}>all</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error :</p>
      ) : null}
    </div>
  )
}

export default Books
