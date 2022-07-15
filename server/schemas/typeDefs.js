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
    }

    type Auth {
        token: ID
        user: User
    }

    type Query {
        userPage: User
    }






`

module.exports = typeDefs