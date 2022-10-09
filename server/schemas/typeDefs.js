const { gql } = require('apollo-server-express');
const {User} = require('./../models');
const typeDefs = gql`
type User {
    _id: ID
    username: String
    email:String
    password: String
}

# Set up an Auth type to handle returning data from a user creating or user login
type Auth {
  token: ID!
  user: User
}


type Query{
    users: [User]!
    user(userId: ID!): User
}

type Mutation {
    # Set up mutations to handle creating a user or logging into a user and return Auth type
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }

`;

module.exports = typeDefs;
