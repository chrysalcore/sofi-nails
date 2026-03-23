import { contactItemList } from "@/lib/data/contact"
import Link from "next/link"

export default function HeaderCTA() {
    return (
        <div className="hidden lg:block z-20 justify-self-end">
            <Link className="flex gap-4 items-center fill-white" href='tel:12144159107' target="_blank" rel='noopener, noreferrer'>
                {contactItemList[2].icon}
                {contactItemList[2].text}
            </Link>
        </div>
    )
}