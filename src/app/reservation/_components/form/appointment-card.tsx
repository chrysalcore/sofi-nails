import Image from "next/image";
import { allura } from "@/lib/fonts";
import type { ReservationState } from "../../_lib/helper/actions";

type Reservation = Extract<ReservationState, { status: "sent" }>["reservation"];

function CardLine({
    label,
    value,
    wide,
}: {
    label: string;
    value: string;
    wide?: boolean;
}) {
    return (
        <div className={`flex flex-col gap-1 ${wide ? "col-span-2" : ""}`}>
            <dt className="eyebrow text-xs">{label}</dt>
            <dd
                className={`border-secondary/50 text-dark border-b pb-1 text-3xl ${allura.className}`}
            >
                {value}
            </dd>
        </div>
    );
}

export function AppointmentCard({ reservation }: { reservation: Reservation }) {
    const date = new Date(reservation.date);
    const day = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
    });
    const time = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });

    return (
        <article
            role="status"
            aria-label="Appointment request sent"
            className="animate-enter text-dark bg-secondary/10 w-full grow basis-[min(15rem,100%)] -rotate-1 self-start rounded-lg p-8 shadow-lg/15"
        >
            <header className="flex items-center justify-between gap-4">
                <Image
                    src="/icons/sofi-logo.svg"
                    alt=""
                    width={48}
                    height={48}
                />
                <p className="eyebrow text-secondary text-xs">
                    Appointment request
                </p>
            </header>
            <h2 className={`text-secondary mt-6 text-5xl ${allura.className}`}>
                See you soon
            </h2>
            <dl className="mt-8 grid grid-cols-[1fr_auto] gap-x-8 gap-y-6">
                <CardLine label="Name" value={reservation.name} wide />
                <CardLine label="Service" value={reservation.subject} wide />
                <CardLine label="Date" value={day} />
                <CardLine label="Time" value={time} />
            </dl>
            <p className="mt-8">
                We&apos;ll confirm your appointment by email shortly.
            </p>
            <p className={`mt-2 text-right text-4xl ${allura.className}`}>
                — Belkis
            </p>
        </article>
    );
}
