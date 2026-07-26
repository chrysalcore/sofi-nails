import Image from "next/image";

function Award() {
    const awardSchema = {
        "@context": "https://schema.org",
        "@type": "Award",
        name: "BusinessRate 2025 - Nail Salon Excellence Award",
        description:
            "Award given to Sofi Nails & Lashes Spa for outstanding Google reviews",
        dateReceived: "2025-07-01",
        url: "https://sofinailsandlashesspa.com/awards/reviews.jpg",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(awardSchema),
                }}
            />
            <figure className="relative flex flex-col items-center rounded-lg bg-white/50">
                <Image
                    className="w-48 p-4"
                    src={"/imgs/award.png"}
                    alt="business rate award"
                    width={192}
                    height={225}
                    priority
                />
                <div className="text-secondary rounded-lg bg-white p-4">
                    <h2 className="text-xl font-medium">Business Rate Award</h2>
                    <p className="font-semibold uppercase">
                        Google
                        <span className="text-base font-normal capitalize">
                            {" "}
                            - July 2025
                        </span>
                    </p>
                </div>
            </figure>
        </>
    );
}

export default Award;
