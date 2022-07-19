const { User, Player, Stat } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    // Should show the User info and all players for the user
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id);
        return userData;
      }
      throw new AuthenticationError("User not found");
    },
    allPlayers: async () => {
      const players = await Player.find();
      return players;
    },
    singlePlayer: async (parent, { playerId }) => {
      const player = await Player.findOne({ _id: playerId });
      return player;
    },
    userPlayers: async (parent, args, context) => {
      const playerList = await Player.find({ user_id: context.user._id })
      return playerList
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

    addUser: async (parent, args) => {
      const user = await User.create(args);
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

        return player;
      }
      throw new AuthenticationError("Must be logged in to create a player");
    },
    removePlayer: async (parent, { playerId }, context) => {
      if (context.user) {
        const player = await Player.findOneAndDelete({ _id: playerId });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { player: player._id } }
        );
        return player;
      }
      throw new AuthenticationError("Must be logged in!")
    },
    newStat: async (parent, { playerId, input }, context) => {
      if (context.user) {
        const stat = await Player.findOneAndUpdate(
          { _id: playerId },
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
                result: input.result,
              },
            },
          }
        );
        return stat;
      }
      throw new AuthenticationError("Must be logged in to add a stat");
    },
    editStat: async (parent, { playerId, statId, input }, context) => {
      if (context.user) {
        const stat = await Player.findOneAndUpdate(
          { _id: playerId },
          {
            where: {
              _id: statId,
              stats: {
                inning: input.inning,
                order: input.order,
                balls: input.balls,
                strikes: input.strikes,
                rbi: input.rbi,
                run: input.run,
                stolen_base: input.stolen_base,
                result: input.result,
              },
            },
          },
          { new: true }
        );
        return stat;
      }
      throw new AuthenticationError("Must be logged in to edit a stat");
    },
    removeStat: async (parent, { playerId, statId }, context) => {
      if (context.user) {
        return Player.findOneAndUpdate(
          { _id: playerId },
          {
            $pull: {
              stats: {
                _id: statId,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("Must be logged in to remove a stat");
    },
  },
};

module.exports = resolvers;
