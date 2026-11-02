import { socialLinkList } from "@/lib/data/social-links";
import { navLinkList } from "@/lib/data/navigation";
import Logo from "@/components/global/logo";
import Title from "../global/title";
import Link from "next/link";

export default function FooterLinks() {
    return (
        <>
            <div className="flex grow basis-32 flex-col items-center gap-4">
                <h3 className="eyebrow flex items-center gap-3 before:h-px before:w-6 before:bg-white/40 after:h-px after:w-6 after:bg-white/40">
                    Sections
                </h3>
                <ul className="flex flex-col items-center gap-2">
                    {navLinkList.map((item) => {
                        return (
                            <li key={item.path}>
                                <Link
                                    className="underline-offset-4 hover:underline"
                                    href={item.path}
                                >
                                    {item.text}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="flex grow basis-32 flex-col items-center gap-4">
                <h3 className="eyebrow flex items-center gap-3 before:h-px before:w-6 before:bg-white/40 after:h-px after:w-6 after:bg-white/40">
                    Social Links
                </h3>
                <ul className="flex flex-col items-center gap-2">
                    {socialLinkList.map((item) => {
                        return (
                            <li key={item.text}>
                                <a
                                    className="underline-offset-4 hover:underline"
                                    href={item.path}
                                    rel="noopener noreferrer"
                                >
                                    {item.text}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="flex grow basis-32 flex-row items-center justify-center gap-6">
                <Logo className="flex size-24 items-center gap-4 self-center fill-white stroke-0" />
                <Title />
            </div>
        </>
    );
}
