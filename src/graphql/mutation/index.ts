import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const REGISTER = gql`
  mutation CreateUser($createUser: UserInput!) {
    createUser(data: $createUser) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;
