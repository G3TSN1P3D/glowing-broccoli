import React from 'react'
import { useQuery } from "@apollo/client";

import { QUERY_USER_PLAYERS } from "../utils/queries";

export default function ProfilePlayers() {
    const { loading, data } = useQuery(QUERY_USER_PLAYERS)

    if (loading) {
        return <h4>Loading...</h4>
    }

    if (!data.userPlayers.length) {
        return <h4>No players yet</h4>
    }
    const list = data.userPlayers.map((player) => {
        return (
            <li key={player._id} className='player-card'>
                <h3>
                    {player.first_name} {player.last_name} {player.number} {player.position.map((position) => <p key={player._id + position}>{position}</p>)}
                </h3>
            </li>
        )
})

    return (
        <div>
            <ul>
                {list}
            </ul>
        </div>
    )
}