import { allura } from "@/lib/fonts";
import type { SectionHeader } from "@/lib/data/sections";

export default function SectionHeader({ eyebrow, title, desc }: SectionHeader) {
    return (
        <hgroup className="animate-reveal flex flex-col items-center gap-6 text-center">
            <p className="eyebrow flex items-center gap-3 text-xs font-semibold before:h-px before:w-6 before:bg-current after:h-px after:w-6 after:bg-current">
                {eyebrow}
            </p>
            <h2
                className={`text-7xl tracking-wider text-balance ${allura.className}`}
            >
                {title}
            </h2>
            <p className="max-w-120 text-balance">{desc}</p>
        </hgroup>
    );
}
