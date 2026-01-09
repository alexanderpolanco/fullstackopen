import { gql } from '@apollo/client';

export const GET_ME = gql`
  query GetMe {
    me {
      username
      favoriteGenre
      id
    }
  }
`