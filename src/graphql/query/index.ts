import { gql } from '@apollo/client';

export const USERS = gql`
  query {
    users {
      nodes {
        id
        name
        email
      }
    }
  }
`;
