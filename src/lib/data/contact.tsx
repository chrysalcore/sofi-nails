export interface ContactItem {
    href: string;
    icon: React.ReactElement;
    name: string;
    text: string;
}

export const contactItemList: ContactItem[] = [
    {
        href: "https://wa.me/15403545325",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height={25}
                width={25}
                viewBox="0 0 16.07 16"
            >
                <path d="M3.65,14.71l.29.17c1.23.73,2.65,1.11,4.09,1.11h0c4.43,0,8.03-3.59,8.04-8,0-2.14-.83-4.14-2.35-5.66-1.52-1.51-3.54-2.34-5.68-2.34C3.6,0,0,3.59,0,8c0,1.51.42,2.98,1.23,4.25l.19.3-.81,2.95,3.04-.79ZM3.97,3.86c.22-.24.48-.3.64-.3s.32,0,.46,0c.15,0,.35-.06.55.41.2.48.68,1.66.74,1.79.06.12.1.26.02.42-.08.16-.12.26-.24.4s-.25.31-.36.42c-.12.12-.25.25-.11.49s.63,1.03,1.34,1.66c.92.82,1.7,1.07,1.94,1.19.24.12.38.1.52-.06.14-.16.61-.7.77-.94.16-.24.32-.2.55-.12.22.08,1.41.66,1.65.78h0c.24.12.4.18.46.29.06.1.06.58-.14,1.14-.2.56-1.17,1.07-1.63,1.14-.42.06-.94.09-1.52-.09-.35-.11-.8-.26-1.38-.51-2.42-1.04-4-3.47-4.13-3.63-.12-.16-.99-1.3-.99-2.49s.63-1.77.85-2.01Z" />
            </svg>
        ),
        name: "Whatsapp",
        text: "+1 (540) 354-5325",
    },
    {
        href: "mailto:contact@sofinailsandlashesspa.com",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height={28}
                width={28}
                viewBox="0 -960 960 960"
            >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm330.5-288.5Q496-450 501-453l283-177q8-5 12-12.5t4-16.5q0-20-17-30t-35 1L480-520 212-688q-18-11-35-.5T160-659q0 10 4 17.5t12 11.5l283 177q5 3 10.5 4.5T480-447q5 0 10.5-1.5Z" />
            </svg>
        ),
        name: "Email",
        text: "contact@sofinailsandlashesspa.com",
    },
    {
        href: "tel:15403545325",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height={28}
                width={28}
                viewBox="0 -960 960 960"
            >
                <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12Z" />
            </svg>
        ),
        name: "Telephone",
        text: "+1 (540) 354-5325",
    },
    {
        href: "https://maps.app.goo.gl/Jkvfq55fCTdPrJbc7",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height={28}
                width={28}
                viewBox="0 -960 960 960"
            >
                <path d="M200-800h560q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720H200q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800Zm0 640q-17 0-28.5-11.5T160-200v-200h-7q-19 0-31-14.5t-8-33.5l40-200q3-14 14-23t25-9h574q14 0 25 9t14 23l40 200q4 19-8 33.5T807-400h-7v200q0 17-11.5 28.5T760-160q-17 0-28.5-11.5T720-200v-200H560v200q0 17-11.5 28.5T520-160H200Zm40-80h240v-160H240v160Z" />
            </svg>
        ),
        name: "Address",
        text: "2928 Bent Tree Cir, Salem, VA",
    },
    {
        href: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Evento&details=Ubicaci%C3%B3n:%20https://maps.google.com/?q=2928+Bent+Tree+Cir,+Salem,+VA&location=2928%20Bent%20Tree%20Cir,%20Salem,%20VA%2024153",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height={28}
                width={28}
                viewBox="0 -960 960 960"
            >
                <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
            </svg>
        ),
        name: "Hours",
        text: "Tuesday - Saturday, 10am - 7pm",
    },
];
