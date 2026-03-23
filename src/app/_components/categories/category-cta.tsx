'use client'

import { useRouter } from "next/navigation"

export default function CategoryCTA({ children, path }: { children: React.ReactNode, path:string }) {
    const router = useRouter()

    const onClick = () => {
        router.push(`/services/${path}`)
    }

    return (
        <div className="cta">
            <button className="flex justify-center items-center gap-2 text-white fill-white bg-main button" onClick={onClick}>
                {children}
                <svg xmlns="http://www.w3.org/2000/svg" height={28} width={28} viewBox="0 -960 960 960">
                    <path d="M646-440H200q-17 0-28.5-11.5T160-480q0-17 11.5-28.5T200-520h446L532-634q-12-12-11.5-28t11.5-28q12-12 28.5-12.5T589-691l183 183q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L589-269q-12 12-28.5 11.5T532-270q-11-12-11.5-28t11.5-28l114-114Z"/>
                </svg>
            </button>
        </div>
    )
}