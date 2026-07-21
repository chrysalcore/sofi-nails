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
        title: "The Essence of Serenity",
        desc: "Step into our space through the lens. Witness the textures, light, and quiet moments that define us.",
    },
    categories: {
        title: "Explore Our Offerings",
        desc: "Browse through our thoughtfully organized categories to find exactly what suits your needs and preferences.",
    },
    services: {
        title: "Transformative Rituals",
        desc: "Handcrafted treatments to awaken skin, release tension, and restore balance. Each moment is an art of renewal.",
    },
    testimonials: {
        title: "Voices of Renewal",
        desc: "Authentic reflections from those who have paused, breathed deeply, and emerged transformed.",
    },
    calendar: {
        title: "Plan Your Visit",
        desc: "Explore our available dates and book your experience with ease. We look forward to welcoming you.",
    },
    reservation: {
        title: "Secure Your Respite",
        desc: "Choose your ritual, time, and surrender. We'll prepare the space for your arrival.",
    },
};
