import { gql } from '@apollo/client';

export const UPDATE_AUTHOR_BORN = gql`
mutation Mutation($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`