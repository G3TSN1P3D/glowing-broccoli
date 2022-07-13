const { Users, Players, Stats } = require('../models')
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        // Should show the User info and all players for the user
        userPage: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({_id: context.user._id})
                return userData
            }
            throw new AuthenticationError('User not found')
        }


    },
    // Mutation: {

    // }
}

module.exports = resolvers