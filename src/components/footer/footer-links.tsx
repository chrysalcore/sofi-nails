import { socialLinkList } from "@/lib/data/social-links";
import { navLinkList } from "@/lib/data/navigation";
import Logo from "@/components/global/logo";
import Title from "../global/title";
import Link from "next/link";

export default function FooterLinks() {
    return (
        <>
            <div className="flex grow basis-32 flex-col items-center gap-4">
                <h3 className="font-bold uppercase">Sections</h3>
                <ul className="flex flex-col items-center gap-2">
                    {navLinkList.map((item) => {
                        return (
                            <li key={item.path}>
                                <Link href={item.path}>{item.text}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="flex grow basis-32 flex-col items-center gap-4">
                <h3 className="font-bold uppercase">Social Links</h3>
                <ul className="flex flex-col items-center gap-2">
                    {socialLinkList.map((item) => {
                        return (
                            <li key={item.text}>
                                <a href={item.path} rel="noopener noreferrer">
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
