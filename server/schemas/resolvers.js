const { User, Channel } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql');
const { signToken } = require('../utils/auth');

//this is a custom decoding strategy for dealing with dates.
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
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
        users: async () =>{
            return User.find();
        },
        //Gets user by id
        user: async (parent, {userId}) => {
            return User.findById({_id:userId});
        },
        //Gets all channels
        channels: async () =>{
          return Channel.find();
        },
        memberChannels: async (parent, {userId}) =>{
          console.log(userId);
          let toBeReturned = [];
          const channels = await Channel.find();
          for(const item of channels){
            if(item.participants.includes(userId)){
              toBeReturned.push(item);
            }
          }
          return toBeReturned;
        },
        //Gets single channel by ID
        channel: async (parent, {channelId}) => {
          return Channel.findById({_id:channelId});
        },
        //Gets channel with messages limited param limit value.
        channelMessages: async (parent, {channelId,limit}) => {
          let num = 50;
          if(limit){
            num = limit;
          }
          //Slices messages sub-field on provided number (-1 to ensure latest messages are included)
          let channel = await Channel.findById(channelId,{messages:{$slice: ["$messages",(-1*num)]}});
          if(!channel){
            //todo add error to throw.
            return;
          }
          return channel;
        
        }

    },
  
    Mutation: {
        //creates a channel, only needs channel name
        createChannel: async (parent,{channelName}) => {
          const channel = await Channel.create({channelName})
          return channel;
        },
        //adds a single message to a channel by id
        addMessageToChannel: async (parent,{channelId,messageText,username})=> {
          const task = await Channel.findOneAndUpdate(
            {_id: channelId},
            { $addToSet: { messages: {messageText,username} } },
            { runValidators: true, new: true }
          );
          return task;
        },
        //adds a participant to the channel
        addChannelParticipant: async (parent,{channelId,userId})=>{
          const task = await Channel.findOneAndUpdate(
            {_id: channelId},
            { $addToSet: { participants: {_id:userId} } },
            { runValidators: true, new: true }
          );
          return task;
        },
        //adds a user to the database, used on signup.
        addUser: async (parent, { username, email, password }) => {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
    
          return { token, user };
        },
        login: async (parent, { username, password }) => {
          const user = await User.findOne({ username });
    
          if (!user) {
            throw new AuthenticationError('No profile with this username found!');
          }
    
          const correctPw = await user.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect password!');
          }
    
          const token = signToken(user);
          return { token, user };
        },
        removeUser: async (parent, args, context) => {
            if (context.user) {
              return User.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
          },
  },
}
module.exports = resolvers;
