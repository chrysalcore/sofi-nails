import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

import Header from "@/components/header/header";
import Hero from "@/components/hero/hero";
import Banner from "@/components/banner/banner";
import Footer from "@/components/footer/footer";
import BodyCTA from "@/components/global/body-cta";
import Head from "next/head";
import Script from "next/script";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Beauty Salon in Salem VA | Sofi Nails & Lashes Spa",
  description: "Professional nail art, eyelash extensions, facial treatments & laser hair removal at 2928 Bent Tree Cir, Salem. 5 Stars Rated. Book your luxury experience today!",
  keywords: "Sofi's Spa, nails, lashes, spa, eyebrowns, facials, manicure, pedicure, laser hair removal, hair removal, nail salon Salem VA, eyelash extensions, facial treatments, Roanoke Valley",
  openGraph: {
    title: "Sofía Nails & Lashes Spa - Salem's Premier Beauty Destination",
    description: 'Certified technicians, luxury experience & premium products. Transforming beauty routines since 2020.',
    images: 'https://sofinailsandlashesspa.com/opengraph-image.webp',
    url: 'https://sofinailsandlashesspa.com',
    siteName: 'Sofi Nails & Lashes Spa',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Beauty Salon in Salem VA | Sofi Nails & Lashes Spa",
    description: "Professional nail art, eyelash extensions, facial treatments & laser hair removal at 2928 Bent Tree Cir, Salem. 5 Stars Rated. Book your luxury experience today!",
    images: 'https://sofinailsandlashesspa.com/opengraph-image.webp'
  },
  icons: {
    icon: '../../public/favicon/favicon.ico',
    apple: '../../public/favicon/apple-icon.png'
  }
};

const worksans = localFont({
    src: '../lib/fonts/WorkSans.ttf',
    display: 'swap',
    preload: true
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="geo.region" content="US-VA" />
        <meta name="geo.placename" content="Salem" />
        <meta name="geo.position" content="37.2935;-80.0554" />
        <meta name="ICBM" content="37.2935, -80.0554" />

        <meta name="apple-mobile-web-app-title" content="SN&LS" />
      </Head>
      <Script id="elfsight-platform" src="https://elfsightcdn.com/platform.js" strategy="lazyOnload"/>
      <GoogleAnalytics gaId="G-44N0ZCHY3Z" />
      <body className={`text-dark/80 ${worksans.className}`}>
        <>
            <Header />
            <main className="main">
                <Hero />
                <Banner />
                { children }
                <BodyCTA />
            </main>
            <Footer />
        </>
      </body>
    </html>
  );
}
