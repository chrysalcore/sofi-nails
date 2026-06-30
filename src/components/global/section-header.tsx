import localFont from "next/font/local"
import type { SectionHeader } from "@/lib/data/sections"

const allura = localFont({
    src: '../../lib/fonts/Allura.ttf',
    display: 'swap',
    preload: true
})

export default function SectionHeader({ title, desc } : SectionHeader) {
    return (
        <header className='flex flex-col items-center text-center gap-6' >
            <h2 className={`text-7xl text-balance tracking-wider ${allura.className}`}>{title}</h2>
            <p className="text-balance opacity-80 max-w-120">{desc}</p>
        </header>
    )
}