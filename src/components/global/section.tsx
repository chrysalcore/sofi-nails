import SectionHeader from "./section-header";
import { CurveDivider } from "./curve-divider";
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
        dark: "text-white py-32 md:py-48 px-4 lg:px-[15dvw] bg-deep",
        light: "text-secondary py-24 md:py-32 px-4 lg:px-[15dvw] bg-white",
    };

    return (
        <section
            className={`relative flex flex-col items-center gap-16 overflow-clip ${isLight ? theme.light : theme.dark}`}
        >
            {!isLight && <CurveDivider edge="top" />}
            <SectionHeader {...sections[type]} />
            {children}
            {!isLight && <CurveDivider edge="bottom" />}
        </section>
    );
}
