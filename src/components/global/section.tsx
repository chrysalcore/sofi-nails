import SectionHeader from "./section-header";
import { sections } from "../../lib/data/sections";

export default function Section({
    children,
    type,
    isLight,
}: {
    children: React.ReactNode;
    type: string;
    isLight?: boolean;
}) {
    const theme = {
        dark: "text-white py-24 px-4 lg:py-24 lg:px-[15dvw] bg-[color-mix(in_srgb,#c39870_70%,#fff)]",
        light: "text-secondary py-56 px-4 lg:px-[15dvw] bg-white bt-shape tp-shape",
    };

    return (
        <section
            className={`relative flex flex-col items-center gap-16 overflow-clip ${isLight ? theme.light : theme.dark}`}
        >
            <SectionHeader {...sections[type]} />
            {children}
        </section>
    );
}
