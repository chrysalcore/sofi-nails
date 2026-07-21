import Image from "next/image";
import { type SocialLink } from "../../lib/data/social-links";

export default function SocialLink({ path, icon, text }: SocialLink) {
    return (
        <li>
            <a href={path} target="_blank" rel="noopener noreferrer">
                <Image
                    src={`/icons/${icon}`}
                    alt={`${text} icon`}
                    className="h-8 w-8"
                    width={32}
                    height={32}
                />
            </a>
        </li>
    );
}
