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
    query allPlayers {
        saved_players{
            first_name
            last_name
            number
            position
        }
    }
`;