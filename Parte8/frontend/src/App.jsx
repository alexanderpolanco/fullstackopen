import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import { useApolloClient, useSubscription } from "@apollo/client/react";
import { BOOK_ADDED } from "./api/graphql/subscriptions/bookAdded.subscription";
import { GET_ALL_BOOKS } from "./api/graphql/queries/getAllBooks.query";

// TODO: 8.26: n + 1

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {

  const currentToken = localStorage.getItem('phonenumbers-user-token')

  const [token, setToken] = useState(currentToken)
  const [page, setPage] = useState("authors");
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCache(client.cache, { query: GET_ALL_BOOKS }, addedBook)
    },
    onError: (error) => {
      console.error('Error en suscripción:', error)
    }
  })

  const logout = () => {
    client.resetStore()
    localStorage.clear()
    setToken(null)
    setPage("authors")
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && <button onClick={() => setPage("recommendations")}>recommendations</button>}
        {token && <button onClick={logout}>logout</button>}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Login show={page === "login"} setPage={setPage} />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page === "recommendations"} />
    </div>
  );
};

export default App;
