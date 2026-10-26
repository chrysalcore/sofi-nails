import { contactItemList } from "@/lib/data/contact";
import { Icon } from "@/components/global/icon";

const telephone = contactItemList.find((item) => item.name === "Telephone");

export default function HeaderCTA() {
    return (
        <div className="z-20 hidden justify-self-end lg:block">
            <a
                className="text-dark flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
                href={telephone?.href}
            >
                {telephone && (
                    <Icon name={telephone.icon} className="text-main size-5" />
                )}
                {telephone?.text}
            </a>
        </div>
    );
}
