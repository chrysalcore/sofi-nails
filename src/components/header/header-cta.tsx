import { contactItemList } from "@/lib/data/contact";
import Link from "next/link";

export default function HeaderCTA() {
    return (
        <div className="z-20 hidden justify-self-end lg:block">
            <Link
                className="flex items-center gap-4 fill-white"
                href="tel:15403545325"
                rel="noopener, noreferrer"
            >
                {contactItemList[2].icon}
                {contactItemList[2].text}
            </Link>
        </div>
    );
}
