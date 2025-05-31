"use client"
import React, { useEffect, useState } from 'react'
import { sdk } from '@farcaster/frame-sdk'
import dynamic from 'next/dynamic';

const Demo = dynamic(() => import("@/app/components/Main"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
});

function Home() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const initializeSDK = async () => {
            try {
                await sdk.actions.ready();
                setIsReady(true);
            } catch (error) {
                console.error('Failed to initialize Farcaster Frame SDK:', error);
            }
        };

        initializeSDK();
    }, []);

    if (!isReady) {
        return <div>Initializing...</div>;
    }

    return (
        <Demo />
    );
}

export default Home