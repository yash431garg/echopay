"use client"
import React, { useEffect } from 'react'
import { sdk } from '@farcaster/frame-sdk'

function Home() {
    useEffect(() => {
        sdk.actions.ready()
    }, [])
    return (
        <div>Start Payment</div>
    )
}

export default Home