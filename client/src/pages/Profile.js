
// DO NOT TOUCH DREW IS WORKING ON



import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PROFILE } from '../utils/queries';

import Auth from '../utils/auth'

export default function Profile() {

    let userId = ''
    
    console.log(Auth.getProfile())

    if (Auth.loggedIn()) {
        userId = Auth.getProfile().data._id
    }

    console.log(userId)

    const { loading, error, data } = useQuery(QUERY_PROFILE, {
        variables: { _id: userId }
    })

    if(error) {
        console.log(error)
    }

    console.log(data)

    if (loading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return (
            <h4>
              You need to be logged in to see this. Use the navigation links above to
              sign up or log in!
            </h4>
          );
    }

    const user = data.user

    return (
        <main>
            <div>
                <h2>Welcome, {user.first_name}!</h2>
            </div>
        </main>
    )
}

