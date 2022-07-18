const { User, Player, Stat } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    // Should show the User info and all players for the user
    userPage: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }
      throw new AuthenticationError("User not found");
    },
    allPlayers: async () => {
      const players = await Player.find();
      return players;
    },
    singlePlayer: async (parent, { playerId }) => {
      const players = await Player.findOne({ _id: playerId });
      return players;
    },
  },

  Mutation: {
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
        console.log(user);

        return player;
      }
      throw new AuthenticationError("Must be logged in to create a player");
    },
    newStat: async (parent, { playerId, input }, context) => {
      if (context.user) {
        console.log(input);
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
        console.log(stat);
        return stat;
      }
      throw new AuthenticationError("Must be logged in to add a stat");
    },
    editStat: async (parent, { playerId, statId, input }, context) => {
      if (context.user) {
        console.log(input);
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
        console.log(stat);
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
      throw new AuthenticationError("Must be logged in to remove a stat")
    },
  },
};

module.exports = resolvers;
