import React from 'react';

export default function Playercard({players}) {
    if (!players) {
        return <h3>Be sure to add players to your tracker!</h3>
    }
    const list = players.allPlayers.map((player) => {
        return (
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{player.first_name} </h5>
            <p class="card-text">{player.last_name}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">{player.number}</li>
            <li class="list-group-item">{player.position.map((position) => <p key={player._id + position}>{position}</p>)}</li>
            <li class="list-group-item">{player.handedness}</li>
          </ul>
        </div>
    )})

    return (
        <div>
            <ul>
                {list}
            </ul>
        </div>
    )
}