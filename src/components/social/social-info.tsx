import { socialLinkList } from "../../lib/data/social-links";
import SocialLink from "./social-link";

export default function SocialInfo() {
    return (
        <ul className="flex items-end gap-16">
            {socialLinkList.map((item) => (
                <SocialLink {...item} key={item.text} />
            ))}
        </ul>
    );
}
