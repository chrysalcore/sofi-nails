import Section from "@/components/global/section";
import GalleryList from "./_components/gallery-list";
import type { Metadata } from "next";
import { contactItemList } from "@/lib/data/contact";
import { ogImage } from "@/lib/data/og-image";

const address =
    contactItemList.find((item) => item.name === "Address")?.text ??
    "2928 Bent Tree Cir, Salem, VA";

export const metadata: Metadata = {
    title: `Nail Salon Since 2020 | Sofi Nails & Lashes Spa`,
    description: `Certified nail and lash technicians at ${address}, rated 4.9 stars on Google. Family-owned since 2020, premium products, personal care.`,
    keywords:
        "Sofi Nails & Lashes Spa, about, nails, lashes, spa, salon Salem VA, beauty salon, eyelash extensions, facial treatments",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: `Nail Salon Since 2020 | Sofi Nails & Lashes Spa`,
        description: `Certified nail and lash technicians at ${address}, rated 4.9 stars on Google. Family-owned since 2020, premium products, personal care.`,
        url: "https://sofinailsandlashesspa.com/about",
        siteName: "Sofi Nails & Lashes Spa",
        locale: "en_US",
        type: "website",
        images: ogImage,
    },
    twitter: {
        card: "summary_large_image",
        title: `Nail Salon Since 2020 | Sofi Nails & Lashes Spa`,
        description: `Certified nail and lash technicians at ${address}, rated 4.9 stars on Google. Family-owned since 2020, premium products, personal care.`,
        images: ogImage,
    },
};

export default function AboutPage() {
    return (
        <div>
            <Section type={"gallery"} isLight>
                <p className="text-dark opacity-80">
                    Owner Belkis Leyva opened Sofi Nails & Lashes Spa in 2020,
                    bringing certified nail and lash training and a hands-on,
                    personal approach to every client. Salem, VA locals have
                    rated the salon 4.9 stars on Google, with reviews
                    consistently praising her attention to detail, cleanliness,
                    and genuine care — the same qualities you&apos;ll find in
                    every corner of this space.
                </p>
                <GalleryList />
            </Section>
        </div>
    );
}
