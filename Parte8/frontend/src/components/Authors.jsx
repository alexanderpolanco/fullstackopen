import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ALL_AUTHORS } from '../api/graphql/queries/getAllAuthors.query';
import { UPDATE_AUTHOR_BORN } from '../api/graphql/mutations/updateBorn.mutation';
import { Select } from './Select';

const Authors = (props) => {
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [born, setBorn] = useState('');

  const { loading, error, data } = useQuery(GET_ALL_AUTHORS);

  const authors = data?.allAuthors || [];

  const [updateAuthorBorn] = useMutation(UPDATE_AUTHOR_BORN);



  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedAuthor || !born) {
      alert('Please select an author and enter a birth year')
      return
    }

    updateAuthorBorn({
      variables: {
        name: selectedAuthor,
        setBornTo: parseInt(born)
      },
      refetchQueries: [{ query: GET_ALL_AUTHORS }]
    })

    setSelectedAuthor('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <Select option={authors} onChange={setSelectedAuthor} />
        <input type="number" min={1} value={born} onChange={(e) => setBorn(e.target.value)} />
        <button type="submit">update author</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error :</p>
      ) : null}
    </div>
  )
}

export default Authors
