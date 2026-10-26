import Image from "next/image";

function Award() {
    return (
        <figure className="relative flex flex-col items-center rounded-lg bg-white/50">
            <Image
                className="w-48 p-4"
                src={"/imgs/award.png"}
                alt="BusinessRate 2025 Nail Salon Excellence Award plaque"
                width={192}
                height={225}
                priority
            />
            <div className="text-secondary rounded-lg bg-white p-4">
                <h2 className="text-xl font-medium">
                    Nail Salon Excellence Award
                </h2>
                <p className="font-semibold uppercase">
                    BusinessRate
                    <span className="text-base font-normal capitalize">
                        {" "}
                        - July 2025
                    </span>
                </p>
            </div>
        </figure>
    );
}

export default Award;
