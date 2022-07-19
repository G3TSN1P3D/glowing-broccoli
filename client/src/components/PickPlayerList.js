import React from 'react';
import { Link } from 'react-router-dom'

export default function PickPlayerList({players}) {
    if (!players) {
        return <h4>You don't have any players! Go to your profile to create some players to record games.</h4>
    }
    const list = players.allPlayers.map((player) => {
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