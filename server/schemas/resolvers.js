const { User, Player, Stat } = require('../models')
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
        },
        allPlayers: async () => {
            const allUsers = await Player.find()
            return allUsers
        }
    },

    // Mutation: {

    // }
}

module.exports = resolvers