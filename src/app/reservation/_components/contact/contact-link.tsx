import { ContactItem } from "../../../../lib/data/contact";

export default function ContactLink({ href, icon, name, text }: ContactItem) {
    return (
        <li className='container/item grow basis-[min(18rem,100%)]'>
            <a href={href} className="flex items-center gap-4" rel="noopener noreferrer" target="_blank">
                <picture className="flex place-content-center p-4 rounded-xl bg-secondary/25 fill-main odd:container/item:bg-main/25">
                    {icon}
                </picture>
                <div className="flex flex-col w-full">
                    <h3 className="text-sm font-bold uppercase">{name}</h3>
                    <p className="text-secondary/80 break-all">{text}</p>
                </div>
            </a>
        </li>
    )
}