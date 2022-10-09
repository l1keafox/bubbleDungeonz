const { User } = require("../models");

const resolvers = {
    Query: {
        users: async () =>{
            return User.find();
        },
        users: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
          },        
    },
  
    Mutation: {
        addProfile: async (parent, { name, email, password }) => {
          const profile = await Profile.create({ name, email, password });
          const token = signToken(profile);
    
          return { token, profile };
        },
        login: async (parent, { email, password }) => {
          const profile = await Profile.findOne({ email });
    
          if (!profile) {
            throw new AuthenticationError('No profile with this email found!');
          }
    
          const correctPw = await profile.isCorrectPassword(password);
    
          if (!correctPw) {
            throw new AuthenticationError('Incorrect password!');
          }
    
          const token = signToken(profile);
          return { token, profile };
        },
    

      },
  };
module.exports = resolvers;
