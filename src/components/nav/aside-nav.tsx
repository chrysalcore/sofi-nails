"use client";

import { Icon } from "@/components/global/icon";

import NavLink from "./nav-link";
import { navLinkList } from "../../lib/data/navigation";
import { useState } from "react";

export default function AsideNav() {
    const [active, setActive] = useState(false);

    const onToggleMenu = () => {
        setActive((prevState) => !prevState);
    };

    return (
        <>
            <button
                className="z-80 justify-self-end lg:hidden"
                onClick={onToggleMenu}
                aria-label={active ? "Close menu" : "Open menu"}
                aria-expanded={active}
            >
                <Icon name={active ? "close" : "menu"} className="size-7" />
            </button>
            <nav
                className={`border-secondary/30 ease-smooth absolute top-0 left-0 -z-50 flex w-full items-end justify-center border-b bg-white pt-20 pb-4 transition-[translate,visibility] duration-300 motion-reduce:transition-none lg:hidden ${active ? "translate-y-0" : "invisible -translate-y-full"}`}
            >
                <ul className="scroll-none flex max-w-full snap-mandatory snap-center gap-6 overflow-auto px-[40dvw]">
                    {navLinkList.map((item) => {
                        return <NavLink key={item.text} {...item} />;
                    })}
                </ul>
            </nav>
        </>
    );
}
