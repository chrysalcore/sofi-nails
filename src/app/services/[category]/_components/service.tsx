import { Icon } from "@/components/global/icon";
import { navLinkList } from "@/lib/data/navigation";
import Image from "next/image";
import Link from "next/link";

function Service({
    categoryName,
    img,
    desc,
    info,
}: {
    categoryName: string;
    img: string;
    desc: string;
    info: {
        name: string;
        price: string;
    }[];
}) {
    const path =
        navLinkList.find((item) => item.text === "Reservation")?.path || "";
    const subject = `${categoryName} – ${info[0].name}`;
    const reservationHref = `${path}?subject=${encodeURIComponent(subject)}`;

    return (
        <li className="animate-reveal text-dark bg-secondary/15 ease-smooth flex flex-col gap-6 rounded-lg p-4 shadow-sm/10 transition-shadow duration-300 hover:shadow-lg/15">
            <div className="flex grow flex-col gap-4">
                <Image
                    className="h-16 w-16 rounded-full"
                    loading="lazy"
                    src={`/imgs/${img}`}
                    alt={info[0].name}
                    width={64}
                    height={64}
                />
                <h3 className="text-secondary flex flex-col text-lg font-semibold">
                    {info.map((i) => (
                        <span key={i.name}>
                            {i.name}:{" "}
                            <span className="text-dark font-bold">
                                ${i.price}
                            </span>
                        </span>
                    ))}
                </h3>
                <p className="line-clamp-5">{desc}</p>
            </div>
            <Link
                href={reservationHref}
                className="button bg-main flex items-center justify-center gap-2 text-white"
            >
                <Icon name="calendar" className="size-6" />
                Book
            </Link>
        </li>
    );
}

export default Service;
