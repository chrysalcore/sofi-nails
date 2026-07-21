import CategoriesList from "./_components/categories/categories-list";
import FAQs from "./_components/faq/faq-content";
import TestimonialsList from "./_components/testimonials/testimonials-list";
import Section from "@/components/global/section";

export default function HomePage() {
    return (
        <div>
            <Section type={"categories"} isLight>
                <CategoriesList />
            </Section>
            <Section type={"faq"}>
                <FAQs />
            </Section>
            <Section type={"testimonials"} isLight>
                <TestimonialsList />
            </Section>
        </div>
    );
}
