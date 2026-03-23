'use client'

import Link from "next/link";
import { type NavLink } from "../../lib/data/navigation";
import { usePathname } from "next/navigation";

export default function NavLink({ path, text }: NavLink) {
    const currentPath = usePathname()
    const isActive = text !== 'Home' && currentPath.startsWith(path) || path === currentPath 

    return (
        <li>
            <Link href={path} className={`tracking-[0.15em] text-[0.9em] transition-all ${isActive? 'font-bold' : ''}`}>{text}</Link>
        </li>
    );
}