import Link from "next/link";
import { type Category } from "../../_lib/data/categories";

export default function CategoryShort({
    name,
    path,
    isActive,
}: Category & { isActive: boolean }) {
    return (
        <li>
            <Link
                className={`ease-smooth block rounded-full px-8 py-4 text-center whitespace-nowrap capitalize transition-[background-color,scale] duration-200 motion-safe:active:scale-95 ${isActive ? "bg-secondary/35 text-dark font-bold" : "bg-secondary/15"}`}
                href={`/services/${path}`}
            >
                {name}
            </Link>
        </li>
    );
}
