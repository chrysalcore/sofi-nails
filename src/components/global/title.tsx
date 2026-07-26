import localFont from "next/font/local";

const konseric = localFont({
    src: "../../lib/fonts/Konseric.woff2",
    display: "swap",
    preload: true,
});

const allura = localFont({
    src: "../../lib/fonts/Allura.woff2",
    display: "swap",
    preload: true,
});

export default function Title({ isMainTitle }: { isMainTitle?: boolean }) {
    const titleStyles = "flex flex-col gap-4 tracking-widest";
    const spanStyles = "block tracking-wider";

    return isMainTitle ? (
        <h1
            className={`text-secondary text-4xl md:text-5xl ${konseric.className} ${titleStyles}`}
        >
            Sofi
            <span
                className={`text-dark/80 text-3xl md:text-4xl ${allura.className} ${spanStyles}`}
            >
                Nails &amp; Lashes <br />
                Spa
            </span>
        </h1>
    ) : (
        <h2
            className={`text-3xl text-white ${konseric.className} ${titleStyles}`}
        >
            Sofi
            <span
                className={`text-2xl text-white/80 ${allura.className} ${spanStyles}`}
            >
                Nails &amp; Lashes <br />
                Spa
            </span>
        </h2>
    );
}
