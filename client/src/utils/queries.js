import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
    }
  }
`;

export const GET_ALL_CHANNELS = gql`
  query Query {
    channels {
      _id
      channelName
    }
  }
`;

export const GET_USER_CHANNELS = gql`
  query MemberChannels {
    memberChannels {
      _id
      channelName
    }
  }
`;
export const GET_CHANNEL_MESSAGES = gql`
  query ChannelMessages($channelId: ID!, $limit: Int) {
    channelMessages(channelId: $channelId, limit: $limit) {
      messages {
        messageText
        username
        createdAt
        _id
      }
    }
  }
`;

export const GET_ME = gql`
  query Me {
    username
    email
    friends {
      username
    }
    settings {
      screenTextColor
      linkTextColor
      chatTextColor
      background
      chatWindow
      header
    }
  }
`;

export const GET_CHANNEL_BY_NAME = gql`
  query GetChannelByName($channelNameString: String) {
    getChannelByName(channelNameString: $channelNameString) {
      _id
      channelName
      participants {
        _id
      }
    }
  }
`;

export const GET_GAME_CARDS = gql`
  query Query {
    gameCards {
      _id
      title
      scores {
        user {
          username
        }
        score
      }
      description
    }
  }
 `;
