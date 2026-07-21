"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
const FALLBACK_DELAY_MS = 4000;

export default function DeferredAnalytics({ gaId }: { gaId: string }) {
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const load = () => setShouldLoad(true);
        const timeout = setTimeout(load, FALLBACK_DELAY_MS);

        INTERACTION_EVENTS.forEach((event) =>
            window.addEventListener(event, load, { once: true, passive: true }),
        );

        return () => {
            clearTimeout(timeout);
            INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, load));
        };
    }, []);

    if (!shouldLoad) return null;

    return <GoogleAnalytics gaId={gaId} />;
}
