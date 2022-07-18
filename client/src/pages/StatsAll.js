import React from 'react'
import { useQuery } from '@apollo/client'

import PlayerList from '../components/PlayerList'

import { QUERY_ALL_PLAYERS } from '../utils/queries'

export default function Statsall() {
    const { loading, data } = useQuery(QUERY_ALL_PLAYERS);
    const players = data || []
    

    return (
        <main>
            <h1>All Players</h1>
            <div>
                {loading ? (
                    <div>Loading</div>
                ) : (
                    <PlayerList
                        players={players}
                    />
                )}
            </div>
        </main>
    )
}
