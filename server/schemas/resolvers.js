const { User, Channel, ScoreCard } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");
const { signToken } = require("../utils/auth");
const { SessionKey } = require("./../engine/");
const { populate } = require("../models/User/User");
//this is a custom decoding strategy for dealing with dates.
const dateScalar = new GraphQLScalarType({
	name: "Date",
	description: "Date custom scalar type",
	serialize(value) {
		return value.getTime(); // Convert outgoing Date to integer for JSON
	},
	parseValue(value) {
		return new Date(value); // Convert incoming integer to Date
	},
	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			// Convert hard-coded AST string to integer and then to Date
			return new Date(parseInt(ast.value, 10));
		}
		// Invalid hard-coded value (not an integer)
		return null;
	},
});

const resolvers = {
	//specifies that when "Date" is the datatype dateScalar should be used to resolve it.
	Date: dateScalar,
	Query: {
		//gets all users
		users: async () => {
			return User.find();
		},
		//Gets user by id
		user: async (parent, { userId }) => {
			return User.findById({ _id: userId });
		},
		//Gets all channels
		channels: async () => {
			return Channel.find();
		},
		memberChannels: async (parent, args, context) => {
			if (context.user) {
				let toBeReturned = [];
				const channels = await Channel.find();
				for (const item of channels) {
					if (item.participants.includes(context.user._id)) {
						toBeReturned.push(item);
					}
				}
				console.log(toBeReturned);
				return toBeReturned;
			} else {
				throw new AuthenticationError("You need to be logged in!");
			}
		},
		//Gets single channel by ID
		channel: async (parent, { channelId }) => {
			return Channel.findById({ _id: channelId });
		},
		//Gets channel with messages limited param limit value.
		channelMessages: async (parent, { channelId, limit }) => {
			let num = 50;
			if (limit) {
				num = limit;
			}
			//Slices messages sub-field on provided number (-1 to ensure latest messages are included)
			let channel = await Channel.findById(channelId, {
				messages: { $slice: ["$messages", -1 * num] },
			});
			if (!channel) {
				//todo add error to throw.
				return;
			}
			return channel;
		},
		//returns the current user id, must be logged in for it to work.
		me: async (parent, args, context) => {
			if (context.user) {
				return User.findOne({ _id: context.user._id });
			}
			throw new AuthenticationError("You need to be logged in!");
		},
		scoreCards: async () => {
			return ScoreCard.find().populate({
				path: "scores",
				populate: { path: "user", model: "user" },
			});
		},
		scoreCard: async (parents, { scoreCardId }) => {
			return ScoreCard.findById({ _id: scoreCardId }).populate({
				path: "scores",
				populate: { path: "user", model: "user" },
			});
		},
	},

	Mutation: {
		//creates a channel, only needs channel name
		createChannel: async (parent, { channelName }) => {
			const channel = await Channel.create({ channelName });
			return channel;
		},
		//adds a single message to a channel by id
		addMessageToChannel: async (
			parent,
			{ channelId, messageText },
			context
		) => {
			const user = await User.findById({ _id: context.user._id });
			if (context.user) {
				const task = await Channel.findOneAndUpdate(
					{ _id: channelId },
					{ $addToSet: { messages: { messageText, username: user.username } } },
					{ runValidators: true, new: true }
				);
				return task;
			}
			throw new AuthenticationError("You need to be logged in!");
		},
		//adds a participant to the channel
		addChannelParticipant: async (parent, { channelId, userId }) => {
			const task = await Channel.findOneAndUpdate(
				{ _id: channelId },
				{ $addToSet: { participants: { _id: userId } } },
				{ runValidators: true, new: true }
			);
			return task;
		},
		//adds a user to the database, used on signup.
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });
			let channels = await Channel.find();
			//this wont scale. Need to write search for global, or better yet need to hard code single global channel with fixed id
			for (const channel of channels) {
				if (channel.channelName == "Global") {
					const task = await Channel.findOneAndUpdate(
						{ _id: channel._id },
						{ $addToSet: { participants: { _id: user._id } } },
						{ runValidators: true, new: true }
					);
				}
			}
			const token = signToken(user);
			return { token, user };
		},
		login: async (parent, { username, password }) => {
			const user = await User.findOne({ username });

			if (!user) {
				throw new AuthenticationError("No profile with this username found!");
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError("Incorrect password!");
			}
			const token = signToken(user);
			return { token, user };
		},
		removeUser: async (parent, args, context) => {
			if (context.user) {
				return User.findOneAndDelete({ _id: context.user._id });
			}
			throw new AuthenticationError("You need to be logged in!");
		},

		authUserSession: async (parent, args, context) => {
			const { username } = await User.findById({ _id: context.user._id });
			// now we send to the engine stuff but I don't really like how this is formatted.
			// we might want to do this an different way, I'll work on it later.
			SessionKey[args.sessionId] = {
				username: username,
				id: context.user._id,
			};
			// console.log(username,"authicate",args.sessionId,SessionKey);
		},
		createScoreCard: async (parent, { game }) => {
			const scoreCard = await ScoreCard.create({ game });
			return scoreCard;
		},
		addScoreToScoreCard: async (parent, { scoreCardId, score, userId }) => {
			const newScore = await ScoreCard.findByIdAndUpdate(
				{ _id: scoreCardId },
				{
					$addToSet: { scores: { user: userId, score: score } },
				},
				{ runValidators: true, new: true }
			);
			return newScore;
		},
		updateScoreOnScoreCard: async (parent, { scoreCardId, score, userId }) => {
			const newScore = await ScoreCard.findByIdAndUpdate(
				{ _id: scoreCardId, "scores.user": userId },
				{
					$set: { "scores.0.score": score },
				},
				{ runValidators: true, new: true }
			);
			return newScore;
		},

		updateSettings: async (
			parent,
			{
				userId,
				screenTextColor,
				linkTextColor,
				chatTextColor,
				background,
				chatWindow,
				header,
			}
		) => {
			const settings = await User.findOneAndUpdate(
				{ _id: userId },
				{
					$set: {
						settings: {
							screenTextColor: screenTextColor,
							linkTextColor: linkTextColor,
							chatTextColor: chatTextColor,
							background: background,
							chatWindow: chatWindow,
							header: header,
						},
					},
				},
				{ runValidators: true, new: true }
			);
			return settings;
		},
	},
};
module.exports = resolvers;
