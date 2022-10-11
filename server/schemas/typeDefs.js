const { gql } = require('apollo-server-express');
const {User,Channel} = require('./../models');

const typeDefs = gql`
scalar Date
type User {
    _id: ID
    username: String
    email:String
}

type Channel {
    _id: ID
    channelName: String
    createdAt: Date
    participants: [User]!
    messages: [Message]
}

type Message {
    _id: ID
    messageText: String
    createdAt: Date
    username: String
}

type Auth {
    token: ID!
    user:User
}

type Query{
    users: [User]
    user(userId: ID!): User
    channels: [Channel]
    channel(channelId: ID!): Channel
    channelMessages(channelId:ID!,limit:Int): Channel
}
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    createChannel(channelName:String!):Channel
    addMessageToChannel(channelId:ID!,messageText:String!,username:String!):Channel
    removeUser: User
  }
`;

module.exports = typeDefs;
