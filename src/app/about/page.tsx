import Section from "@/components/global/section";
import GalleryList from "./_components/gallery-list";
import type { Metadata } from "next";
import { contactItemList } from "@/lib/data/contact";

const address =
    contactItemList.find((item) => item.name === "Address")?.text ??
    "2928 Bent Tree Cir, Salem, VA";
const hours =
    contactItemList.find((item) => item.name === "Hours")?.text ??
    "Tuesday - Saturday, 10am - 7pm";

export const metadata: Metadata = {
    title: `About | Sofi Nails & Lashes Spa`,
    description: `Sofi Nails & Lashes Spa is located in Salem, VA (${address}). Certified technicians and premium products, transforming beauty routines since 2020. Open ${hours}.`,
    keywords:
        "Sofi Nails & Lashes Spa, about, nails, lashes, spa, salon Salem VA, beauty salon, eyelash extensions, facial treatments",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: `About | Sofi Nails & Lashes Spa`,
        description: `Sofi Nails & Lashes Spa is located in Salem, VA (${address}). Certified technicians and premium products, transforming beauty routines since 2020. Open ${hours}.`,
        url: "https://sofinailsandlashesspa.com/about",
        siteName: "Sofi Nails & Lashes Spa",
        locale: "en_US",
        type: "website",
        images: "https://sofinailsandlashesspa.com/opengraph-image.jpg",
    },
    twitter: {
        card: "summary_large_image",
        title: `About | Sofi Nails & Lashes Spa`,
        description: `Sofi Nails & Lashes Spa is located in Salem, VA (${address}). Certified technicians and premium products, transforming beauty routines since 2020. Open ${hours}.`,
        images: "https://sofinailsandlashesspa.com/opengraph-image.jpg",
    },
};

export default function AboutPage() {
    return (
        <div>
            <Section type={"gallery"} isLight>
                <GalleryList />
            </Section>
        </div>
    );
}
