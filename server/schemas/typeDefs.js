const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Users {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        password: String!
        saved_players: [ID]
    }
    type Player {
        _id: ID!
        first_name: String
        last_name: String!
        number: Int
        position: [String]
        handedness: String
        user_id: ID!
        stats: [Stats]
    }
    type Stats {
        inning: Int
        order: Int
        balls: Int
        strikes: Int
        result: String
        rbi: Int
        run_scored: Int
        stolen_base: Int
    }
    type Auth {
        token: ID!
        email: User
    }

    type Query {
        userPage: Users
        allPlayers: [Players]!
    }

    type Mutation {
        login:(email: String!, password: String): Auth
        addUser( email: String!, password: String!): Auth
    }
`

module.exports = typeDefs