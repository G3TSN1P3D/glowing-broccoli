import { gql } from '@apollo/client';

export const QUERY_PROFILE =  gql`
    query userPage {
        first_name
        saved_players
    }
`
 
export const QUERY_ALL_PLAYERS = gql`
    query allPlayers {
        _id
        first_name
        last_name
        number
        position
        handedness
        stats {
            inning
            order
            balls
            strikes
            rbi
            run
            stolen_base
        }
    }
`;

export const QUERY_SINGLE_PLAYER = gql`
    query singlePlayer($_id: ID!) {
        player(_id: $_id) {
            _id
            first_name
            last_name
            number
            position
            handedness
            stats {
                inning
                order
                balls
                strikes
                rbi
                run
                stolen_base
            }
        }
    }
`