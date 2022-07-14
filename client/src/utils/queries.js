import { gql } from '@apollo/client';

export const QUERY_PROFILE =  gql`
    query userPage {
        first_name
        players{
            first_name
            last_name
            number
            position
        }
    }
    query allPlayers {
        savedPlayers{
            first_name
            last_name
            number
            position
        }
    }

`