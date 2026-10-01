import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/header/header";
import Hero from "@/components/hero/hero";
import Banner from "@/components/banner/banner";
import Footer from "@/components/footer/footer";
import BodyCTA from "@/components/global/body-cta";
import DeferredAnalytics from "@/components/global/deferred-analytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { worksans } from "@/lib/fonts";
import { preload } from "react-dom";
import { contactItemList } from "@/lib/data/contact";
import { socialLinkList } from "@/lib/data/social-links";

const SITE_URL = "https://sofinailsandlashesspa.com";

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: "Beauty Salon in Salem VA | Sofi Nails & Lashes Spa",
    description:
        "Professional nail art, eyelash extensions, facial treatments & laser hair removal at 2928 Bent Tree Cir, Salem. 4.9 Stars on Google. Book your luxury experience today!",
    keywords:
        "Sofi's Spa, nails, lashes, spa, eyebrowns, facials, manicure, pedicure, laser hair removal, hair removal, nail salon Salem VA, eyelash extensions, facial treatments, Roanoke Valley",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "Sofi Nails & Lashes Spa - Salem's Premier Beauty Destination",
        description:
            "Certified technicians, luxury experience & premium products. Transforming beauty routines since 2020.",
        images: `${SITE_URL}/opengraph-image.jpg`,
        url: SITE_URL,
        siteName: "Sofi Nails & Lashes Spa",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Beauty Salon in Salem VA | Sofi Nails & Lashes Spa",
        description:
            "Professional nail art, eyelash extensions, facial treatments & laser hair removal at 2928 Bent Tree Cir, Salem. 4.9 Stars on Google. Book your luxury experience today!",
        images: `${SITE_URL}/opengraph-image.jpg`,
    },
    appleWebApp: {
        title: "SN&LS",
    },
    other: {
        "geo.region": "US-VA",
        "geo.placename": "Salem",
        "geo.position": "37.2935;-80.0554",
        ICBM: "37.2935, -80.0554",
    },
};

const phone =
    contactItemList
        .find((item) => item.name === "Telephone")
        ?.text.replace(/[^\d+]/g, "") ?? "+15403545325";

const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Sofi Nails & Lashes Spa",
    image: `${SITE_URL}/opengraph-image.jpg`,
    url: SITE_URL,
    telephone: phone,
    priceRange: "$$",
    address: {
        "@type": "PostalAddress",
        streetAddress: "2928 Bent Tree Cir",
        addressLocality: "Salem",
        addressRegion: "VA",
        postalCode: "24153",
        addressCountry: "US",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 37.2935,
        longitude: -80.0554,
    },
    openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
    },
    sameAs: socialLinkList.map((item) => item.path),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    preload("/imgs/back-hero.webp", { as: "image", fetchPriority: "high" });

    return (
        <html lang="en">
            <DeferredAnalytics gaId="G-44N0ZCHY3Z" />
            <body className={`text-dark/80 ${worksans.className}`}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(localBusinessSchema),
                    }}
                />
                <Header />
                <main className="main">
                    <Hero />
                    <Banner />
                    {children}
                    <BodyCTA />
                </main>
                <Footer />
                <SpeedInsights />
            </body>
        </html>
    );
}
