import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_PROFILE } from '../utils/queries'

export default function Home() {
    const { loading, data } = useQuery(QUERY_PROFILE);
    const profile = data?.profile || [];


    return (
        <main>
            <div>
                hello
            </div>
        </main>
    )
}

