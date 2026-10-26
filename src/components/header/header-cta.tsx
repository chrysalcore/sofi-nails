import { contactItemList } from "@/lib/data/contact";

const telephone = contactItemList.find((item) => item.name === "Telephone");

export default function HeaderCTA() {
    return (
        <div className="z-20 hidden justify-self-end lg:block">
            <a
                className="flex items-center gap-4 fill-white"
                href={telephone?.href}
            >
                {telephone?.icon}
                {telephone?.text}
            </a>
        </div>
    );
}
