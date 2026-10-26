import { Icon } from "@/components/global/icon";
import { contactItemList } from "@/lib/data/contact";

const phoneHref =
    contactItemList.find((item) => item.name === "Telephone")?.href ??
    "tel:15403545325";

export default function BodyCTA() {
    return (
        <div className="fixed right-6 bottom-6 z-50 lg:hidden">
            <a
                className="bg-main button m-0 flex items-center p-4 text-white shadow-sm/10"
                href={phoneHref}
                aria-label="Call Sofi Nails & Lashes Spa"
            >
                <Icon name="phone" className="size-7" />
            </a>
        </div>
    );
}
