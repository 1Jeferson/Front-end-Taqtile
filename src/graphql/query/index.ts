import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query ListUsers($userData: PageInput!) {
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

export const USER_BY_ID_QUERY = gql`
  query User($userId: ID) {
    user(id: $userId) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;
