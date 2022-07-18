const { User, Player, Stat } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
    Query: {
        // Should show the User info and all players for the user
        userPage: async (parent, { userId }, context) => {
            console.log(context)
            // if(context.user) {
                const userData = await User.findOne({_id: userId})
                return userData
            // }
        },
        allPlayers: async () => {
            const players = await Player.find()
            return players
        },
        singlePlayer: async (parent, { playerId }) => {
            const players = await Player.findOne({_id: playerId})
            return players
        }
    },

    Mutation: {
        login: async(parent, {email, password}) => {
            const user = await User.findOne({email: email})

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

        addUser: async (parent, { first_name, last_name, email, password }) => {
            const user = await User.create({ first_name, last_name, email, password });
            const token = signToken(user);
            return { token, user };
        },

        newPlayer: async (parent, { input }, context) => {
        if (context.user) {
            const player = await Player.create({
            first_name: input.first_name,
            last_name: input.last_name,
            number: input.number,
            position: input.position,
            handedness: input.handedness,
            user_id: context.user._id,
            });

            const user = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $push: { saved_players: player._id } }
            );
            console.log(user);

                    return player
                }
                throw new AuthenticationError('Must be logged in to create a player')
            },
        newStat: async(parent, { playerId, input }, context) => {
                if(context.user) {
                    console.log(input)
                    const stat = Player.findOneAndUpdate(
                        { _id: playerId},
                        {
                            $addToSet: {
                                stats: {
                                    inning: input.inning,
                                    order: input.order,
                                    balls: input.balls,
                                    strikes: input.strikes,
                                    rbi: input.rbi,
                                    run: input.run,
                                    stolen_base: input.stolen_base,
                                    result: input.result
                                }
                            }
                        }
                    )
                    console.log(stat)
                    return stat
                }
            }
        }
    }




module.exports = resolvers;
