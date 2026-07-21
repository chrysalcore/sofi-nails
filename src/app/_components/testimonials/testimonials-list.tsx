"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

export default function TestimonialsList() {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px" },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref}>
            {inView && (
                <>
                    <Script
                        id="elfsight-platform"
                        src="https://elfsightcdn.com/platform.js"
                        strategy="afterInteractive"
                    />
                    <div
                        className="elfsight-app-2db79281-8c28-4ef2-9073-01929cb15609"
                        data-elfsight-app-lazy
                    ></div>
                </>
            )}
        </div>
    );
}
