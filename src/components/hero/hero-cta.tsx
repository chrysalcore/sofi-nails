import { Icon } from "@/components/global/icon";
import { navLinkList } from "@/lib/data/navigation";
import Link from "next/link";

export default function HeroCTA({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const path =
        navLinkList.find((item) => item.text === "Reservation")?.path || "";

    return (
        <div className={className}>
            <Link
                href={path}
                className="button bg-main flex items-center gap-2 rounded-2xl text-white"
            >
                <Icon name="calendar" className="size-6" />
                {children}
            </Link>
        </div>
    );
}
