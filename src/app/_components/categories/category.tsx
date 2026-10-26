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
        <li className="group text-dark bg-secondary/15 ease-smooth relative flex min-h-100 flex-col justify-between gap-8 overflow-clip rounded-lg pb-4 shadow-sm/10 transition-shadow duration-300 hover:shadow-lg/15">
            <div className="flex flex-col gap-4">
                <picture className="flex aspect-5/2 w-full overflow-clip">
                    <Image
                        className="ease-soft w-full transition-transform duration-700 motion-safe:group-hover:scale-105"
                        src={`/imgs/${img}`}
                        alt={title}
                        width={360}
                        height={144}
                    />
                </picture>
                <div className="flex flex-col gap-3 px-4">
                    <h3 className="text-secondary text-xl font-semibold">
                        {title}
                    </h3>
                    <p>{desc}</p>
                </div>
                <small className="px-4 text-2xl font-bold">${minPrice}+</small>
            </div>
            <CategoryCTA path={path} title={title}>
                See More
            </CategoryCTA>
        </li>
    );
}
