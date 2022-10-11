const { gql } = require('apollo-server-express');
const {User} = require('./../models');
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email:String
}
type Auth {
    token: ID!
    user:User
}

type Query{
    users: [User]
}
type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    removeUser: User
  }
`;

module.exports = typeDefs;
