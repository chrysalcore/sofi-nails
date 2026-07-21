import localFont from "next/font/local";
import type { SectionHeader } from "@/lib/data/sections";

const allura = localFont({
    src: "../../lib/fonts/Allura.ttf",
    display: "swap",
    preload: true,
});

export default function SectionHeader({ title, desc }: SectionHeader) {
    return (
        <header className="flex flex-col items-center gap-6 text-center">
            <h2
                className={`text-7xl tracking-wider text-balance ${allura.className}`}
            >
                {title}
            </h2>
            <p className="max-w-120 text-balance opacity-80">{desc}</p>
        </header>
    );
}
