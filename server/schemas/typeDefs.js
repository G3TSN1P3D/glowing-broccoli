const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Users {
        _id: ID!
        first_name: String!
        last_name: String!
        email: String!
        password: String!
        players: [Players]
    }
    type Players {
        _id: ID!
        first_name: String!
        last_name: String!
        number: Int
        position: [String]
        handedness: String
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

    type Query {
        userPage: Users
    }

    # type Mutation {

    # }
`

module.exports = typeDefs