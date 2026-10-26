import { contactItemList } from "@/lib/data/contact";

const telephone = contactItemList.find((item) => item.name === "Telephone");

export default function HeaderCTA() {
    return (
        <div className="z-20 hidden justify-self-end lg:block">
            <a
                className="text-dark fill-main flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
                href={telephone?.href}
            >
                {telephone?.icon}
                {telephone?.text}
            </a>
        </div>
    );
}
