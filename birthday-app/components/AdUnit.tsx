'use client'

import { useEffect } from 'react'

declare global {
    interface Window {
        adsbygoogle: unknown[]
    }
}

export default function AdUnit({ slot }: { slot: string }) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({})
        } catch (e) {}
    }, [])

    return (
        <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-8786228898244008"
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        />
    )
}