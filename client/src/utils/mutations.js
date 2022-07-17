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
    mutation addUser($email: String!, $password: String!) {
        addUser(email: $email, password: $password) {
            token
            user {
                _id
                email
            }
        }
    }
`;

export const NEW_PLAYER = gql`
    mutation newPlayer(
            $firstName: String, 
            $lastName: String, 
            $number: Int, 
            $position: [String], 
            $handedness: String) {
                newPlayer(
                    input: {
                        first_name: $firstName,
                        last_name: $lastName,
                        number: $number,
                        position: $position,
                        handedness: $handedness}
                ) {
                    player {
                        first_name
                        last_name
                        number
                        position
                        handedness
                    }
                }
            }

`