const { User, Channel } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
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
        channel: async (parent, {channelId}) => {
          return Channel.findById({_id:channelId});
        },

    },
  
    Mutation: {
        createChannel: async (parent,{name}) => {
          const channel = await Channel.create({name})
        },
        //does it let us mix and match async and .then?
        addMessageToChannel: async (parent,{channelId,messageText,username})=> {
          Channel.findOneAndUpdate(
            {_id: channelId},
            { $addToSet: { messages: {messageText,username} } },
            { runValidators: true, new: true }
          ).then((channel)=>
            !channel
            ? res.status(404).json({ message: 'No channel with this id!' })
            : res.json(channel)
          ).catch((err) => res.status(500).json(err));
        },
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
