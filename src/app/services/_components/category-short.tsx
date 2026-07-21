"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Category } from "../../_lib/data/categories";

export default function CategoryShort({ name, path }: Category) {
    const currentPath = usePathname();
    const isActive = currentPath.endsWith(path);

    return (
        <li>
            <Link
                className={`block rounded-full px-8 py-4 text-center whitespace-nowrap capitalize transition-colors ${isActive ? "bg-secondary/35 text-dark font-bold" : "bg-secondary/15"}`}
                href={`/services/${path}`}
            >
                {name}
            </Link>
        </li>
    );
}
