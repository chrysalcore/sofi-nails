import { Icon } from "@/components/global/icon";
import Link from "next/link";

export default function CategoryCTA({
    children,
    path,
    title,
}: {
    children: React.ReactNode;
    path: string;
    title: string;
}) {
    return (
        <div className="px-4">
            <Link
                className="button bg-main ease-smooth flex items-center justify-center gap-2 text-white transition-[gap,scale] duration-300 hover:gap-5"
                href={`/services/${path}`}
            >
                {children}
                <span className="sr-only">{` about ${title}`}</span>
                <Icon name="arrow-right" className="size-6" />
            </Link>
        </div>
    );
}
