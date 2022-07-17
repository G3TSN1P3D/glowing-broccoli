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
      console.log(players);
      return players;
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Email not found");
      }
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new AuthenticationError("Password incorrect");
      }
      const token = signToken(user);

      return { token, user };
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
        console.log(user);

        return player;
      }
      throw new AuthenticationError("Must be logged in to create a player");
    },
    newStat: async (parent, { input }, context) => {
      if (context.player) {
        const stat = await Stat.create({
          inning: input.inning,
          order: input.order,
          balls: input.balls,
          strikes: input.strikes,
          rbi: input.rbi,
          run: input.run,
          stolen_base: input.stolen_base,
        });
        const player = await Player.findOneAndUpdate(
          { _id: context.player._id },
          { $push: { stats: stat._id } }
        );
        console.log(stat);

        return stat;
      }
    },
  },
};

module.exports = resolvers;
