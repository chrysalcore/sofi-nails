import { navLinkList } from "@/lib/data/navigation"
import Image from "next/image"
import Link from "next/link"

function Service({ img, desc, info }: {
    img: string,
    desc: string,
    info: {
            name: string
            price: string
    }[]
}) {
    const path = navLinkList.find((item) => (item.text === 'Reservation'))?.path || ''
    const subject = info[0].name
    const reservationHref = `${path}?subject=${encodeURIComponent(subject)}`

    return (
        <li className="flex flex-col gap-6 p-4 text-dark bg-secondary/15 rounded-lg">
            <div className="flex flex-col gap-4 min-h-64">
                <Image className="w-16 h-16 rounded-full" loading="lazy" src={`/imgs/${img}`} alt="service img" width={64} height={64} />
                <h3 className="text-lg">
                    {info.map(i => (
                        <p key={i.name}>{i.name}: <span className="text-main font-semibold">${i.price}</span><br /></p>
                    ))}
                </h3>
                <p className='text-dark/70 line-clamp-5'>{desc}</p>
            </div>
            <Link
                href={reservationHref}
                className="flex items-center self-center gap-2 button text-white fill-white bg-main rounded-2xl"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 -960 960 960">
                    <path d="M289-329q-29-29-29-71t29-71q29-29 71-29t71 29q29 29 29 71t-29 71q-29 29-71 29t-71-29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-40q0-17 11.5-28.5T280-880q17 0 28.5 11.5T320-840v40h320v-40q0-17 11.5-28.5T680-880q17 0 28.5 11.5T720-840v40h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"/>
                </svg>
                Book
            </Link>
        </li> 
    )
}

export default Service