export interface SectionHeader {
    eyebrow: string;
    title: string;
    desc: string;
}

interface Sections {
    [key: string]: SectionHeader;
}

export const sections: Sections = {
    faq: {
        eyebrow: "FAQ",
        title: "Your questions answered",
        desc: "Get clarity on our services, safety standards, and booking process",
    },
    gallery: {
        eyebrow: "About Us",
        title: "Nail salon since 2020",
        desc: "Every visit is guided by certified technicians and premium products, in a space built for you to slow down.",
    },
    categories: {
        eyebrow: "Our Services",
        title: "Explore our offerings",
        desc: "Browse through our thoughtfully organized categories to find exactly what suits your needs and preferences.",
    },
    services: {
        eyebrow: "Treatments",
        title: "Nails, lashes & skin rituals",
        desc: "Handcrafted nail, lash, and skin treatments — from classic manicures to laser hair removal — using premium products and techniques suited to you.",
    },
    testimonials: {
        eyebrow: "Reviews",
        title: "Real reviews, real results",
        desc: "Rated 4.9 stars on Google by the Salem, VA community — here's what real clients say about their visit.",
    },
    reservation: {
        eyebrow: "Reservation",
        title: "Book your appointment",
        desc: "Reserve your nail, lash, facial, or laser hair removal treatment at Sofi Nails & Lashes Spa in Salem, VA — we'll have everything ready for your arrival.",
    },
};
