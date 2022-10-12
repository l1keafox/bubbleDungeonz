const { gql } = require("apollo-server-express");
const { User, Channel, ScoreCard, Settings } = require("./../models");

const typeDefs = gql`

scalar Date
type User {
    _id: ID
    username: String
    email:String
}

	type Settings {
		_id: ID
		screenTextColor: String
		linkTextColor: String
		chatTextColor: String
		background: String
		chatWindow: String
		header: String
	}


type Channel {
    _id: ID
    channelName: String
    createdAt: Date
    participants: [User]
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
    memberChannels:[Channel]
    me: User
}
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    createChannel(channelName:String!):Channel
    addMessageToChannel(channelId:ID!,messageText:String!):Channel
    removeUser: User
    addChannelParticipant(channelId:ID!,userId:ID!):Channel
    authUserSession(sessionId:ID!):User
  }
type Subscription {
    messageAdded(channelId: ID!): Channel
}

	type ScoreCard {
		_id: ID
		game: String
		scores: [Score]
	}

	type Score {
		_id: ID
		user: User
		score: Int
		createdAt: Date
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		users: [User]
		user(userId: ID!): User
		channels: [Channel]
		channel(channelId: ID!): Channel
		channelMessages(channelId: ID!, limit: Int): Channel
		me: User
		memberChannels: [Channel]
		scoreCards: [ScoreCard]
		scoreCard(scoreCardId: ID!): ScoreCard
	}
	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(username: String!, password: String!): Auth
		createChannel(channelName: String!): Channel
		addMessageToChannel(channelId: ID!, messageText: String!): Channel
		removeUser: User
		addChannelParticipant(channelId: ID!, userId: ID!): Channel
		createScoreCard(game: String!): ScoreCard
		addScoreToScoreCard(scoreCardId: ID!, score: Int, userId: ID!): ScoreCard
		updateSettings(
			userId: ID!
			screenTextColor: String!
			linkTextColor: String!
			chatTextColor: String!
			background: String!
			chatWindow: String!
			header: String!
		): User
	}
`;
module.exports = typeDefs;
