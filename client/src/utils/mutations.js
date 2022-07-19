import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token
                user {
                    _id
                    email
                }
            }
        }
`;

export const ADD_USER = gql`
    mutation addUser($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
        addUser(first_name: $first_name, last_name: $last_name, email: $email, password: $password) {
            token
            user {
                _id
                first_name
                last_name
                email
            }
        }
    }
`;

export const NEW_PLAYER = gql`
    mutation newPlayer(
            $first_name: String, 
            $last_name: String, 
            $number: Int, 
            $position: [String], 
            $handedness: String) {
                newPlayer(
                    input: {
                        first_name: $first_name,
                        last_name: $last_name,
                        number: $number,
                        position: $position,
                        handedness: $handedness}
                ) {
                    first_name
                    last_name
                    number
                    position
                    handedness
                }
            }

`

export const NEW_STAT = gql`
    mutation newStat(
        $playerId: ID,
        $inning: Int,
        $order: Int,
        $balls: Int,
        $strikes: Int,
        $rbi: Int,
        $run: Boolean,
        $stolen_base: Int,
        $result: String) {
            newStat(
                playerId: $playerId,
                input: {
                    inning: $inning,
                    order: $order,
                    balls: $balls,
                    strikes: $strikes,
                    rbi: $rbi,
                    run: $run,
                    stolen_base: $stolen_base
                    result: $result
                }
            ) {
               
                    first_name
                    last_name
                    stats {
                        inning
                        order
                        balls
                        strikes
                        rbi
                        run
                        stolen_base
                        result
                    }
                
            }
        }
`