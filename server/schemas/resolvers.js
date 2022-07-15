const { User, Player, Stat } = require('../models')
const { signToken } = require('../utils/auth')
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

    Mutation: {
        login: async(parent, {email, password}) => {
            const user = await User.findOne({email})
            if (!user) {
                throw new AuthenticationError('Email not found')
            }
            const correctPassword = await user.isCorrectPassword(password)
            if (!correctPassword) {
                throw new AuthenticationError('Password incorrect')
            }
            const token = signToken(user)

            return { token, user }
        },
        addUser: async(parent, args) => {
            const user = await User.create(args)
            const token = signToken(user)
            return { token, user }
        }

    }
}

module.exports = resolvers