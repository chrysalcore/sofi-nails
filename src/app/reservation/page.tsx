import Calendar from "./_components/calendar";
import Form from "./_components/form/form";
import ContactInfo from "./_components/contact/contact-info";
import type { Metadata } from "next";
import { contactItemList } from "@/lib/data/contact";

const address = contactItemList.find(item => item.name === 'Address')?.text ?? '2928 Bent Tree Cir, Salem, VA';
const hours = contactItemList.find(item => item.name === 'Hours')?.text ?? 'Tuesday - Saturday, 10am - 7pm';
const phone = contactItemList.find(item => item.name === 'Telephone')?.text ?? '+1 (540) 354-5325';

export const metadata: Metadata = {
    title: `Reservation | Sofi Nails & Lashes Spa`,
    description: `Book your luxury experience at Sofi Nails & Lashes Spa in Salem, VA (${address}). Hours: ${hours}. Nails, lashes, facials & laser hair removal. Call ${phone}.`,
    keywords: "reservation, appointment, book online, Sofi Nails & Lashes Spa, nails, lashes, facial treatments, laser hair removal, salon Salem VA, eyelash extensions",
    openGraph: {
        title: `Reservation | Sofi Nails & Lashes Spa`,
        description: `Book your luxury experience at Sofi Nails & Lashes Spa in Salem, VA (${address}). Hours: ${hours}. Nails, lashes, facials & laser hair removal. Call ${phone}.`,
        url: 'https://sofinailsandlashesspa.com/reservation',
        siteName: 'Sofi Nails & Lashes Spa',
        locale: 'en_US',
        type: 'website',
        images: 'https://sofinailsandlashesspa.com/opengraph-image.webp',
    },
    twitter: {
        card: 'summary_large_image',
        title: `Reservation | Sofi Nails & Lashes Spa`,
        description: `Book your luxury experience at Sofi Nails & Lashes Spa in Salem, VA (${address}). Hours: ${hours}. Nails, lashes, facials & laser hair removal. Call ${phone}.`,
        images: 'https://sofinailsandlashesspa.com/opengraph-image.webp',
    }
};

export default function ReservationPage() {
    return (
        <div className="flex flex-col gap-32 py-56 px-4 lg:px-[15dvw] relative bt-shape tp-shape">
            <Calendar />
            <section className="flex flex-wrap gap-16 overflow-clip relative text-secondary bg-white">
                <ContactInfo />
                <Form />
            </section>
        </div>
    )
}