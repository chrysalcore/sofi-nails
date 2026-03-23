import Image from "next/image"

function Service({ img, desc, info }: {
    img: string,
    desc: string,
    info: {
            name: string
            price: string
    }[]
}) {
    return (
        <li className="flex flex-col gap-4 p-4 min-h-64 text-dark bg-secondary/15 rounded-lg">
            <Image className="w-16 h-16 rounded-full" loading="lazy" src={`/imgs/${img}`} alt="service img" width={64} height={64} />
            <h3 className="text-lg">
                {info.map(i => (
                    <p key={i.name}>{i.name}: <span className="text-main font-semibold">${i.price}</span><br /></p>
                ))}
            </h3>
            <p className='text-dark/70 line-clamp-6'>{desc}</p>
        </li>
    )
}

export default Service