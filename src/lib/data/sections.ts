export interface SectionHeader {
    title: string;
    desc: string;
}

interface Sections {
    [key: string]: SectionHeader;
}

export const sections: Sections = {
    faq: {
        title: "Your Questions Answered",
        desc: "Get clarity on our services, safety standards, and booking process",
    },
    gallery: {
        title: "Nail Salon Since 2020",
        desc: "Every visit is guided by certified technicians and premium products, in a space built for you to slow down.",
    },
    categories: {
        title: "Explore Our Offerings",
        desc: "Browse through our thoughtfully organized categories to find exactly what suits your needs and preferences.",
    },
    services: {
        title: "Nails, Lashes & Skin Rituals",
        desc: "Handcrafted nail, lash, and skin treatments — from classic manicures to laser hair removal — using premium products and techniques suited to you.",
    },
    testimonials: {
        title: "Real Reviews, Real Results",
        desc: "Rated 4.9 stars on Google by the Salem, VA community — here's what real clients say about their visit.",
    },
    calendar: {
        title: "Plan Your Visit",
        desc: "Explore our available dates and book your experience with ease. We look forward to welcoming you.",
    },
    reservation: {
        title: "Book Your Appointment",
        desc: "Reserve your nail, lash, facial, or laser hair removal treatment at Sofi Nails & Lashes Spa in Salem, VA — we'll have everything ready for your arrival.",
    },
};
