# Sofi Nails & Lashes Spa Front-end

Business website for Sofi Nails & Lashes Spa beauty salon with all their services, categories, reviews and contact info.

[![Next.js](https://img.shields.io/badge/Next.js_16.2.9-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5.9-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/Polyform_Perimeter_License_1.0.0-red)](LICENSE)

## Preview

Live Link: [https://sofinailsandlashesspa.com](https://sofinailsandlashesspa.com)

## Description

**Sofi Nails & Lashes Spa Front-end** is a production business website built with Next.js, TypeScript, and the App Router for Sofi Nails & Lashes Spa — a beauty salon in Salem, Virginia. The stack prioritizes SEO, performance, and maintainability through Server Components, static and dynamic page generation, and Vercel deployment.

The site showcases services, categories, reviews, FAQs, and contact information. Dynamic routes power individual service category pages (`/services/nails`, `/services/lashes`, etc.), while static rendering and metadata APIs keep pages fast and fully indexable. Local SEO is reinforced with geo-targeted metadata, keyword-rich titles and descriptions, an auto-generated `sitemap.ts`, `robots.ts`, Open Graph and Twitter cards, and per-route OG image generation.

Since launch (September 2025 – June 2026), Google Analytics confirms the SEO strategy is delivering measurable results:

| Metric | Result |
| :--- | :--- |
| Active users | **1,600+** |
| New users | **1,595** |
| Page views | **5,615+** |
| Sessions | **2,100+** |
| Avg. engagement time | **59 seconds** |
| Reservation form starts | **129** |

**Organic search is the #1 acquisition channel**, driving ~700 active users and ~1,100 sessions via `google / organic` — ahead of direct and social traffic. This validates the local SEO focus on Salem, VA keywords (e.g. the homepage title *"Beauty Salon in Salem VA"*, which alone earned **4,100+ views** and **1,500+ active users**).

Top-performing pages reflect strong search intent and content relevance:

| Page | Views | Bounce rate |
| :--- | :--- | :--- |
| Home (`/`) | 2,776 | 41.2% |
| Nails services (`/services/nails`) | 877 | — |
| Reservation (`/reservation`) | 781 | 8.4% |
| Lashes services (`/services/lashes`) | 311 | — |
| Luxe Hands & Feet Rituals | 439 | 3.0% |

Low bounce rates on service and reservation pages (3–8%) indicate visitors are finding relevant content and moving toward booking. Social channels (Facebook, Instagram) complement organic search, contributing ~400–450 new users alongside direct traffic.

Built with React components, responsive TailwindCSS styling, accessibility in mind, and Google Analytics integration via `@next/third-parties` for ongoing performance tracking.

## Main Features

- Server-side/Static rendering using Next.js (`getStaticProps`, `getStaticPaths`, or `app` router with Server Components)
- Component-based UI architecture
- Static and dynamic page generation for services and categories
- Responsive design with CSS modules or global styles
- SEO-friendly metadata and Open Graph tags
- Reservation form powered by a Next.js Server Action that emails the salon via Resend

## Reservation Form & Email Notifications

The booking flow (`/reservation`) is built entirely with a Next.js Server Action — no external API route or client-side fetch involved.

- `sendEmail` ([`src/app/reservation/_lib/helper/actions.tsx`](src/app/reservation/_lib/helper/actions.tsx)) is a `'use server'` action wired to the form via `useActionState`. It trims and validates the submitted fields (name, email, date, subject, description) and returns `{ success, error }` state consumed directly by the form UI — no `try/catch` on the client.
- On success, it renders a React email template ([`email.tsx`](src/app/reservation/_components/form/email.tsx)) to static markup with `react-dom/server` and sends it through the [Resend](https://resend.com/) API, replying-to the customer's own address so the salon can respond directly from their inbox.
- Requires a `RESEND_API_KEY` environment variable (see [Local Installation](#local-installation-and-use) below).

## Technologies Used

| Category | Technologies |
| :--- | :--- |
| Framework | Next.js 16.2.9 |
| Language | TypeScript |
| Styling | CSS, TailwindCSS |
| Routing | Next.js App Router |
| Backend | Server Actions, Resend (transactional email) |
| Tools | ESLint, Prettier |
| Version Control | Git, GitHub |
| Deployment | Vercel |

## Local Installation and Use

Follow these steps to run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Steps

1. Clone the repository

    ```bash
    git clone https://github.com/chrysalcore/sofinailsandlashesspa.git
    cd sofinailsandlashesspa
    ```

2. Install dependencies

    ```bash
    npm install
    # or pnpm install
    ```

3. Configure environment variables

    Create a `.env.local` file in the project root with your [Resend](https://resend.com/) API key, used by the reservation form's Server Action to send emails:

    ```bash
    RESEND_API_KEY=your_resend_api_key
    ```

4. Run development mode

    ```bash
    npm run dev
    # or pnpm dev
    ```

5. Build for production

    ```bash
    npm run build
    npm run start
    # or pnpm build && pnpm start
    ```

## License

This project is licensed under the [PolyForm Perimeter License 1.0.0](LICENSE)

### Key Restrictions

- Free use for **non-commercial projects**.
- Use **prohibited** in businesses that compete with the owner.
- **Contact the owner** for a commercial license.
