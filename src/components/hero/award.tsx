import Image from "next/image";

function Award() {
    const awardSchema = {
        "@context": "https://schema.org",
        "@type": "Award",
        "name": "BusinessRate 2025 - Nail Salon Excellence Award",
        "description": "Award given to Sofi Nails & Lashes Spa for outstanding Google reviews",
        "dateReceived": "2025-07-01",
        "url": "https://sofinailsandlashesspa.com/awards/reviews.jpg"
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(awardSchema)}} />
            <figure className="flex flex-col items-center bg-white/50 rounded-lg relative">
                <Image className="p-4 w-48" src={'/imgs/award.png'} alt="business rate award" width={192} height={225} preload />
                <div className="p-4 bg-white text-secondary rounded-lg">
                    <h2 className="text-xl font-medium">Business Rate Award</h2>
                    <p className="font-semibold uppercase">Google<span className="text-base font-normal capitalize"> - July 2025</span></p>
                </div>
            </figure>
        </>
    );
}

export default Award;