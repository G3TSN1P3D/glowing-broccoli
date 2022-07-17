const { gql } = require('apollo-server-express');

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
        _id: ID
        inning: Int
        order: Int
        balls: Int
        strikes: Int
        rbi: Int
        run: Boolean
        stolen_base: Int

    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        userPage: User
        allPlayers: Player
    }

    type Mutation {
        addUser(first_name: String, last_name: String, email: String, password: String): Auth
        login(email: String, password: String): Auth
        newPlayer(input: NewPlayerInput): Player
        newStat(input: NewStatInput): Stat
    }






`

module.exports = typeDefs;