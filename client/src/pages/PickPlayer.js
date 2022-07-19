import React from 'react'
import { useQuery } from '@apollo/client'

import PickPlayerList from '../components/PickPlayerList'

import { QUERY_ALL_PLAYERS } from '../utils/queries'


export default function PickPlayer() {
    const { loading, data } = useQuery(QUERY_ALL_PLAYERS);
    const players = data || []
    console.log(players)
    

    return (
        <main>
            <h1>Pick a Player</h1>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <PickPlayerList
                        players={players}
                    />
                )}
            </div>
        </main>
    )
}
