import { type Category } from "@/app/_lib/data/categories"
import CategoryCTA from "./category-cta"
import Image from "next/image"

export default function Category({ path, img, title, desc, minPrice }: Category) {
    return (
        <li className='flex flex-col justify-between items-center pb-4 gap-8 min-h-100 max-h-[auto] text-dark bg-secondary/15 rounded-lg relative overflow-clip'>
            <div className='flex flex-col items-center gap-4'>
                <picture className='flex w-full overflow-clip aspect-5/2'>
                    <Image className=" w-full" src={`/imgs/${img}`} alt={`${title} icon`} width={288} height={115.2} />
                </picture>
                <div className="flex flex-col py-0 px-4 gap-3 text-center">
                    <h3 className="text-secondary text-lg">{title}</h3>
                    <p className="text-dark/70">{desc}</p>
                </div>
                <small className="text-main font-bold text-2xl tracking-tighter">${minPrice}+</small>
            </div>
            <CategoryCTA path={path}>See More</CategoryCTA>
        </li>
    )
}