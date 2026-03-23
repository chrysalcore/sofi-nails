'use client'

import Link from "next/link"
import { usePathname } from "next/navigation";
import { type Category } from "../../_lib/data/categories"

export default function CategoryShort({ name, path }: Category) {
    const currentPath = usePathname()
    const isActive = currentPath.endsWith(path)

    return (
        <li >
            <Link className={`py-4 px-8 block text-center capitalize rounded-full transition-colors whitespace-nowrap ${isActive? 'bg-secondary/35 text-dark font-bold' : 'bg-secondary/15'}`} href={`/services/${path}`}>{name}</Link>
        </li>
    )
}