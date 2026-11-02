import { Icon } from "@/components/global/icon";
import { type SocialLink } from "../../lib/data/social-links";

export default function SocialLink({ path, icon, text }: SocialLink) {
    return (
        <li>
            <a
                className="text-secondary hover:text-dark transition-colors"
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={text}
            >
                <Icon name={icon} className="size-7" />
            </a>
        </li>
    );
}
