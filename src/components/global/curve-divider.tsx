export function CurveDivider({ edge }: { edge: "top" | "bottom" }) {
    return (
        <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 z-30 h-16 w-full fill-white md:h-28 ${edge === "top" ? "-top-px rotate-180" : "-bottom-px"}`}
        >
            <path
                fillOpacity="0.25"
                d="M0 46C360 14 700 74 1050 42C1250 24 1370 8 1440 14V120H0Z"
            />
            <path
                fillOpacity="0.5"
                d="M0 76C420 44 760 98 1120 60C1280 44 1380 48 1440 54V120H0Z"
            />
            <path d="M0 106C480 106 840 64 1180 66C1320 67 1400 82 1440 90V120H0Z" />
        </svg>
    );
}
