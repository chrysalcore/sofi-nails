import Section from "@/components/global/section";
import CategoriesListShort from "../_components/categories-list-short";

export default async function ServiceLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ category: string }>;
}) {
    const { category } = await params;

    return (
        <div>
            <Section type={"services"} isLight>
                <CategoriesListShort activePath={category} />
                <hr className="text-secondary/50 w-full rounded-lg" />
                {children}
            </Section>
        </div>
    );
}
