"use client"

import { Button } from "@/components/ui/button"
import posthog from "posthog-js"
import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("Caught by app/error.tsx ErrorBoundry : ",error)
        posthog.captureException(error)
    }, [error])

    return <div className="flex justify-center gap-4 h-screen flex-col items-center">
        <h1 className="lg:text-3xl text-xl">Something wrong happend!</h1>
        <Button
        
            onClick={reset}
        >
            Retry
        </Button>
    </div>
}
