import { gql } from '@apollo/client';

export const GET_ALL_AUTHORS = gql`
  query GetAllAuthors {
    allAuthors {
      name
      born
      bookCount
    }
  }
`