import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_PROFILE } from '../utils/queries';

// add logic to open based on the signed in user, the QUERY_PROFILE can be used for this
// Week 11, Day 5, Unit 10 Solved has an example of this that will need to be slightly
// adjusted to just use the logged in user or tell the user to login / signup since
// you will not be able to visit other user profiles

export default function Profile() {


    return (
        <main>
            <div>
                Profile
            </div>
        </main>
    )
}

