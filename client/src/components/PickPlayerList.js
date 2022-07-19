import React from 'react';
import { Link } from 'react-router-dom'
import { useQuery } from "@apollo/client";

import { QUERY_USER_PLAYERS } from "../utils/queries";

export default function PickPlayerList({}) {
    const { loading, data } = useQuery(QUERY_USER_PLAYERS)

    if (loading) {
        return <h4>Loading...</h4>
    }

    if (!data.userPlayers.length) {
        return <h4>No players yet</h4>
    }
    const list = data.userPlayers.map((player) => {
        return (
            <div key={player._id}>
                <Link
                    to={`/record/${player._id}`}
                >
                <h4 className='player-card btn btn-primary btn-block btn-squared'>
                    #{player.number} {player.first_name} {player.last_name}
                </h4>
                </Link>
            </div>
        )
})

    return (
        <div>
            {list}
        </div>
    )
}