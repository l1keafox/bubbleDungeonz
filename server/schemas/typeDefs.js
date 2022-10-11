const { gql } = require('apollo-server-express');
const {User,Channel} = require('./../models');
const typeDefs = gql`
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
}
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth

    removeUser: User
  }
`;

module.exports = typeDefs;
