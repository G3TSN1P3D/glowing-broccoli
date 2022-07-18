import React from 'react';
import { Link } from 'react-router-dom'

export default function PlayerList({players}) {
    if (!players.allPlayers.length) {
        return <h4>No players yet</h4>
    }
    console.log(players.allPlayers)
    const list = players.allPlayers.map((player) => {
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
            <p>LIST</p>
            <ul>
                {list}
            </ul>
        </div>
    )
}