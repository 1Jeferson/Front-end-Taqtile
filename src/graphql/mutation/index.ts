import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
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

export const REGISTER_MUTATION = gql`
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
