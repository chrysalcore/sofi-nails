import Image from "next/image";

export default function Award() {
    return (
        <figure className="flex flex-col items-center gap-3">
            <Image
                className="w-32"
                src={"/imgs/award.png"}
                alt="BusinessRate 2025 Nail Salon Excellence Award plaque"
                width={192}
                height={225}
                priority
            />
            <figcaption className="text-dark flex flex-col items-center gap-1">
                <span className="eyebrow">Nail Salon Excellence Award</span>
                <span className="text-sm">BusinessRate · July 2025</span>
            </figcaption>
        </figure>
    );
}
