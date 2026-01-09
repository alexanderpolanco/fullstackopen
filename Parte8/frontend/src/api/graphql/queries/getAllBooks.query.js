import { gql } from '@apollo/client';

export const GET_ALL_BOOKS = gql`
  query GetAllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        born
        name
      }
      genres
    }
  }
`