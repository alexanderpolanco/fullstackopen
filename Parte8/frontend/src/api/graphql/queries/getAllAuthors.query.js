import { gql } from '@apollo/client';

export const GET_ALL_AUTHORS = gql`
  query ExampleQuery {
    allAuthors {
      name
      born
      bookCount
    }
  }
`