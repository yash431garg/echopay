"use client"
import React, { useEffect } from 'react'
import { sdk } from '@farcaster/frame-sdk'
import dynamic from 'next/dynamic';


const Demo = dynamic(() => import("@/app/components/Main"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
});

function Home() {
    useEffect(() => {
        sdk.actions.ready()
    }, [])

    return (
        <Demo />
    )
}

export default Home