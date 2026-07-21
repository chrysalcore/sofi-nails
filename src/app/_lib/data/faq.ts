type faqGroupName =
    | "Payment and Deposits"
    | "Warranty Policy"
    | "Cancellation and Rescheduling"
    | "Service Recommendations"
    | "General Policies";

export interface FAQ {
    id: number;
    question: string;
    answer: string;
    list: string[];
    note: string;
}

export interface FAQGroup {
    groupName: faqGroupName;
    faqList: FAQ[];
}

export const faqGroupList: FAQGroup[] = [
    {
        groupName: "Payment and Deposits",
        faqList: [
            {
                id: 1,
                question: "What payment methods do you accept?",
                answer: "We accept cash or Zelle.",
                list: [],
                note: "",
            },
            {
                id: 2,
                question: "Is a deposit required?",
                answer: "Yes, a $20 deposit is required for the following services:",
                list: [
                    "Lashes extensions",
                    "Eyebrows",
                    "Manicure and pedicure",
                    "Waxing",
                    "Facial cleansing",
                ],
                note: "This deposit is non-refundable.",
            },
        ],
    },
    {
        groupName: "Warranty Policy",
        faqList: [
            {
                id: 3,
                question: "What does your warranty cover?",
                answer: "You have 48 hours to resolve any issues with any service performed.",
                list: [],
                note: "",
            },
            {
                id: 4,
                question: "What is not covered by the warranty?",
                answer: "",
                list: [
                    "Refunds for any service",
                    "Issues reported after 48 hours of service completion",
                    "Waxing",
                    "Facial cleaning",
                ],
                note: "If you don't contact us within 48 hours to resolve the problem, you won't be covered by the warranty.",
            },
        ],
    },
    {
        groupName: "Cancellation and Rescheduling",
        faqList: [
            {
                id: 5,
                question: "What is your cancellation policy?",
                answer: "If you cancel your appointment:",
                list: [
                    "You may reschedule within 24 hours",
                    "You will lose your deposit",
                    "You cannot reschedule with the same deposit",
                ],
                note: "",
            },
            {
                id: 6,
                question: "How much time should I allocate for services?",
                answer: "Estimated service time is 1, 2, or up to 3 hours per client. Please be tolerant and patient.",
                list: [],
                note: "",
            },
        ],
    },
    {
        groupName: "Service Recommendations",
        faqList: [
            {
                id: 7,
                question:
                    "What are your recommendations for eyelash appointments?",
                answer: "",
                list: [
                    "Remove contact lenses if you wear them",
                    "Avoid alcohol consumption",
                    "Arrive without makeup",
                    "Do not curl your eyelashes",
                    "Avoid using oily products",
                    "Avoid caffeine consumption",
                ],
                note: "",
            },
        ],
    },
    {
        groupName: "General Policies",
        faqList: [
            {
                id: 8,
                question: "Are refunds available?",
                answer: "No, we do not offer refunds for any service.",
                list: [],
                note: "",
            },
            {
                id: 9,
                question:
                    "How long do I have to report a problem with my service?",
                answer: "You must contact us within 48 hours of service completion to be eligible for warranty coverage.",
                list: [],
                note: "",
            },
        ],
    },
];
