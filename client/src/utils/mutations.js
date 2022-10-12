import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $name, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const POST_MESSAGE_TO_CHANNEL = gql`
  mutation Mutation($channelId: ID!, $messageText: String!) {
    addMessageToChannel(channelId: $channelId, messageText: $messageText) {
      _id
    }
  }
`;

export const AUTH_USER_SESSION = gql`
  mutation authSessId(userId:ID!){
    authUserSession(userId:ID!){
      token
      user {
        _id
        username
      }
    }
  }
`;