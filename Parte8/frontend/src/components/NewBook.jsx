import { useState } from 'react'
import { ADD_BOOK } from '../api/graphql/mutations/addBook.mutation';
import { GET_ALL_AUTHORS } from '../api/graphql/queries/getAllAuthors.query';
import { GET_ALL_BOOKS } from '../api/graphql/queries/getAllBooks.query';
import { useMutation } from '@apollo/client/react';

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [mutate, { data, loading, error }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_ALL_AUTHORS }, { query: GET_ALL_BOOKS, variables: { genre: null } }]
  })

  const submit = async (event) => {
    event.preventDefault()
    mutate({ variables: { title, author, published: parseInt(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
      {loading ? (
        <p>adding book...</p>
      ) : error ? (
        <p>error adding book</p>
      ) : null}
    </div>
  )
}

export default NewBook