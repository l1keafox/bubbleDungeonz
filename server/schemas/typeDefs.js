const { gql } = require("apollo-server-express");
const { User, Channel, GameCard, Settings } = require("./../models");

const typeDefs = gql`
	scalar Date
	type User {
		_id: ID
		username: String
		email: String
		settings: Settings
		friends: [User]
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
	type GameCard {
		_id: ID
		title: String
		scores: [Score]
		description: String
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
		getChannelByName(channelNameString: String): Channel
		gameCards: [GameCard]
		gameCard(GameCardId: ID!): GameCard
	}
	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(username: String!, password: String!): Auth
		createChannel(channelName: String!): Channel
		addMessageToChannel(channelId: ID!, messageText: String!): Channel
		removeUser: User
		addChannelParticipant(channelId: ID!, userId: ID!): Channel

		leaveChannel(channelId: String): Channel
		joinChannel(channelId: String): Channel
		createGameCard(title: String!): GameCard
		addScoreToGameCard(gameCardId: ID!, score: Int, userId: ID!): GameCard
		updateScoreOnGameCard(gameCardId: ID!, score: Int, userId: ID!): GameCard
		updateSettings(
			screenTextColor: String!
			linkTextColor: String!
			chatTextColor: String!
			background: String!
			chatWindow: String!
			header: String!
		): User
		authUserSession(sessionId: ID!): User
	}
	type Subscription {
		messageAdded(channelId: ID!): Channel
	}
`;
module.exports = typeDefs;
