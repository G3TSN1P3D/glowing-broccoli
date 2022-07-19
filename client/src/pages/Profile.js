
// DO NOT TOUCH DREW IS WORKING ON

import React, { useState } from 'react';
import Modal from 'react-modal'
import { Navigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { QUERY_PROFILE } from '../utils/queries';

import { NEW_PLAYER } from '../utils/mutations';

import Auth from '../utils/auth'

Modal.setAppElement("#root")

export default function Profile() {
    // Modal Logic
    const [open, setOpen] = useState(false)

    function openModal() {
        setOpen(!open);
    }

    // New Player Form Logic
    const [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        number: null,
        position: [],
        handedness: ''
    })
    const [newPlayer, { playerError, playerData }] = useMutation(NEW_PLAYER)
    const handleChange = (event) => {
        const { name, value } = event.target;

        let newValue = value;

        if(name === 'number') {
            newValue = parseInt(value)
            console.log(typeof(newValue))
        }

        setFormState({
            ...formState,
            [name]: newValue,
        })
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
    
        try {
          const { data } = await newPlayer({
            variables: { ...formState },
          });

        } catch (e) {
          console.error(e);
        }
      };

    // Get Profile Data Logic

    // console.log(userId)

    const { loading, error, data } = useQuery(QUERY_PROFILE)

    if(error) {
        console.log(error)
    }

    // console.log(data)

    if (loading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return (
            <div>
                <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
                </h4>

            </div>
          );
    }
    console.log(data)
    const user = data.user

    return (
        <main>
            <div>
                <h2>Welcome, {user.first_name}!</h2>
                <button onClick={() => openModal()}>
                    Create a new player
                </button>

                <Modal





                    isOpen={open}
                    onRequestClose={() => openModal()}
                    contentLabel="New Player"
                >

                </Modal>
            </div>

        </main>
    )
}

