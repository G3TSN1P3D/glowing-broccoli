import { gql } from '@apollo/client';

export const QUERY_PROFILE =  gql`
    query userPage {
        first_name
        player{
            first_name
            last_name
            number
            position
        }
    }
`
 
export const QUERY_ALL_PLAYERS = gql`
    query allPlayers {
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