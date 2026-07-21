import Section from "@/components/global/section";
import CategoriesListShort from "./_components/categories-list-short";

export default function ServiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Section type={"services"} isLight>
                <CategoriesListShort />
                <hr className="text-secondary/50 w-full rounded-lg" />
                {children}
            </Section>
        </div>
    );
}
