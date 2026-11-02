import { ContactItem } from "../../../../lib/data/contact";
import { Icon } from "@/components/global/icon";

export default function ContactLink({ href, icon, name, text }: ContactItem) {
    return (
        <li className="grow basis-[min(18rem,100%)]">
            <a
                href={href}
                className="flex items-center gap-4"
                rel="noopener noreferrer"
            >
                <picture className="bg-secondary/25 text-main flex place-content-center rounded-xl p-4">
                    <Icon name={icon} className="size-6" />
                </picture>
                <div className="flex w-full flex-col">
                    <h3 className="eyebrow">{name}</h3>
                    <p className="text-secondary/80 break-all">{text}</p>
                </div>
            </a>
        </li>
    );
}
