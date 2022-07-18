const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    first_name: String
    last_name: String
    email: String
    password: String
    saved_players: [ID]
  }

  type Player {
    _id: ID
    first_name: String
    last_name: String
    number: Int
    position: [String]
    handedness: String
    user_id: ID
    stats: [Stat]
  }

  type Stat {
    inning: Int
    order: Int
    balls: Int
    strikes: Int
    rbi: Int
    run: Boolean
    stolen_base: Int
    result: String
  }

  input NewPlayerInput {
    _id: ID
    first_name: String
    last_name: String
    number: Int
    position: [String]
    handedness: String
  }

  input NewStatInput {
    inning: Int
    order: Int
    balls: Int
    strikes: Int
    rbi: Int
    run: Boolean
    stolen_base: Int
    result: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    allPlayers: [Player]
    singlePlayer: Player
  }

  type Mutation {
    addUser(
      first_name: String
      last_name: String
      email: String
      password: String
    ): Auth
    login(email: String, password: String): Auth
    newPlayer(playerId: ID, input: NewPlayerInput): Player
    removePlayer(playerId: ID!): Player
    newStat(input: NewStatInput): Player
    editStat(playerId: ID!, statId: ID, input: NewStatInput): Player
    removeStat(playerId: ID!, statId: ID): Player
  }
`;

module.exports = typeDefs;
