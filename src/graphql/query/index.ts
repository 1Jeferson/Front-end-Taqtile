import { gql } from '@apollo/client';

export const USERS = gql`
  query ListUsers($userData: PageInput) {
    users(data: $userData) {
      nodes {
        id
        name
        email
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        limit
        offset
      }
      count
    }
  }
`;
