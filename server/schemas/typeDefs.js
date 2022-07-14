const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Users {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        password: String!
        savedPlayers: [Players]
    }
    type Players {
        first_name: String
        last_name: String!
        number: Int!
        position: [String]!
        handedness: String!
        statId: [Stats]!
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

    type Query {
        userPage: Users
        allPlayers: [Players]!
    }

    # type Mutation {

    # }
`

module.exports = typeDefs