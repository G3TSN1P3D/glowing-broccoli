import React from 'react';

export default function PlayerList({players}) {
    function percentageStats(stats) {
        if(!stats.length) {
            return (
                <div>
                    <li className="list-group-item">AVG: N/A</li>
                    <li className="list-group-item">SLG: N/A</li>
                    <li className="list-group-item">OBP: N/A</li>
                </div>
            )
        }

        let totalAtBats = 0;
        let totalHits = 0;
        let totalBases = 0;
        let totalObpAb = 0;
        let totalWalks = 0;

        for(let i = 0; i < stats.length; i++) {
            if(stats[i].count_for_average) {
                totalAtBats++
                totalObpAb++
            }
            if(stats[i].bases_hit > 0) {
                totalHits++
                totalBases += stats[i].bases_hit
            }
            if(stats[i].balls === 4) {
                totalObpAb++
                totalWalks++
            }
        }
        let average = totalHits / totalAtBats
        average = average.toFixed(3)

        let slugging = totalBases / totalAtBats
        slugging = slugging.toFixed(3)

        let onBase = (totalWalks + totalHits) / totalObpAb
        onBase = onBase.toFixed(3)

        return (
            <div>
                <li className="list-group-item">AVG: {average}</li>
                <li className="list-group-item">SLG: {slugging}</li>
                <li className="list-group-item">OBP: {onBase}</li>
            </div>
        )
    }

    function countingStats(stats) {
        if(!stats.length) {
            return (
                <div>
                    <li className="list-group-item">Home Runs: N/A</li>
                    <li className="list-group-item">RBI: N/A</li>
                    <li className="list-group-item">Stolen Bases: N/A</li>
                    <li className="list-group-item">Runs Scored: N/A</li>
                </div>
            )
        }

        let dingers = 0;
        let rbi = 0
        let sb = 0
        let runs = 0

        for(let i = 0; i < stats.length; i++) {
            if(stats[i].bases_hit === 4) {
                dingers++
            }
            if(stats[i].run) {
                runs++
            }
            sb += stats[i].stolen_base
            rbi += stats[i].rbi
        }
        return (
            <div>
                <li className="list-group-item">Home Runs: {dingers}</li>
                <li className="list-group-item">RBI: {rbi}</li>
                <li className="list-group-item">Stolen Bases: {sb}</li>
                <li className="list-group-item">Runs Scored: {runs}</li>
            </div>
        )
    }

    if (!players) {
        return <h3>Be sure to add players to your tracker!</h3>
    }

    if (players == []) {
        return <h3>No Players available!</h3>
    }

    const list = players.allPlayers.map((player) => {
        const avg = percentageStats(player.stats)
        const counting = countingStats(player.stats)

        return (
        <div key={player._id} className="card col-11 p-0 mb-5 ml-3 mr-3">
          <div className="card-body bg-dark text-primary">
            <div className='d-flex flex-row justify-content-between'>
                <h5 className="card-title">{player.last_name}</h5>
                <h5 style={{width: '30px', height: '30px'}} className="card-title bg-primary text-light rounded-circle text-center">{player.number}</h5>
            </div>
            <div className='d-flex flex-row justify-content-between'>
                <p className="card-text">{player.first_name}</p>
                {player.position.map((position) => <p key={player._id + position}>{position}</p>)}
            </div>
          </div>
          <ul className="list-group list-group-flush">
            {avg}
            {counting}
          </ul>
        </div>
    )})

        

    return (
        <div className='d-flex flex-column'>
            {list}
        </div>
    )
}