import SectionHeader from "@/components/global/section-header";
import ContactLinkList from "./contact-link-list";
import { sections } from "@/lib/data/sections";

export default function ContactInfo() {
    return (
        <div className="flex grow basis-[min(15rem,100%)] flex-col gap-12">
            <SectionHeader {...sections.reservation} />
            <ContactLinkList />
        </div>
    );
}
