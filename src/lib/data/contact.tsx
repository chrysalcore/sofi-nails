import type { IconName } from "@/components/global/icon";

export interface ContactItem {
    href: string;
    icon: IconName;
    name: string;
    text: string;
}

export const contactItemList: ContactItem[] = [
    {
        href: "https://wa.me/15403545325",
        icon: "whatsapp",
        name: "Whatsapp",
        text: "+1 (540) 354-5325",
    },
    {
        href: "mailto:contact@sofinailsandlashesspa.com",
        icon: "mail",
        name: "Email",
        text: "contact@sofinailsandlashesspa.com",
    },
    {
        href: "tel:15403545325",
        icon: "phone",
        name: "Telephone",
        text: "+1 (540) 354-5325",
    },
    {
        href: "https://maps.app.goo.gl/Jkvfq55fCTdPrJbc7",
        icon: "map-pin",
        name: "Address",
        text: "2928 Bent Tree Cir, Salem, VA",
    },
    {
        href: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Sofi%20Nails%20%26%20Lashes%20Spa&details=Location:%20https://maps.google.com/?q=2928+Bent+Tree+Cir,+Salem,+VA&location=2928%20Bent%20Tree%20Cir,%20Salem,%20VA%2024153",
        icon: "clock",
        name: "Hours",
        text: "Tuesday - Saturday, 10am - 7pm",
    },
];
