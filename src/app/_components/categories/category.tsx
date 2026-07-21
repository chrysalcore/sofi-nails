import { type Category } from "@/app/_lib/data/categories";
import CategoryCTA from "./category-cta";
import Image from "next/image";

export default function Category({
    path,
    img,
    title,
    desc,
    minPrice,
}: Category) {
    return (
        <li className="text-dark bg-secondary/15 relative flex max-h-[auto] min-h-100 flex-col items-center justify-between gap-8 overflow-clip rounded-lg pb-4">
            <div className="flex flex-col items-center gap-4">
                <picture className="flex aspect-5/2 w-full overflow-clip">
                    <Image
                        className="w-full"
                        src={`/imgs/${img}`}
                        alt={`${title} icon`}
                        width={288}
                        height={115.2}
                    />
                </picture>
                <div className="flex flex-col gap-3 px-4 py-0 text-center">
                    <h3 className="text-secondary text-lg">{title}</h3>
                    <p className="text-dark/70">{desc}</p>
                </div>
                <small className="text-main text-2xl font-bold tracking-tighter">
                    ${minPrice}+
                </small>
            </div>
            <CategoryCTA path={path}>See More</CategoryCTA>
        </li>
    );
}
