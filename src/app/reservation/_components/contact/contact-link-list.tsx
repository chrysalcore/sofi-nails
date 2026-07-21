import { contactItemList } from "../../../../lib/data/contact";
import ContactLink from "./contact-link";

export default function ContactLinkList() {
    return (
        <ul className="flex flex-col gap-2">
            {contactItemList.map((item) => (
                <ContactLink {...item} key={item.name} />
            ))}
        </ul>
    );
}
