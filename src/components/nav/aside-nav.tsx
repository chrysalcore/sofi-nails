"use client";

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
                className="z-80 justify-self-end fill-white lg:hidden"
                onClick={onToggleMenu}
                aria-label={active ? "Close menu" : "Open menu"}
                aria-expanded={active}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height={32}
                    width={32}
                    viewBox="0 -960 960 960"
                >
                    <path d="M160-240q-17 0-28.5-11.5T120-280q0-17 11.5-28.5T160-320h640q17 0 28.5 11.5T840-280q0 17-11.5 28.5T800-240H160Zm0-200q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520h640q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H160Zm0-200q-17 0-28.5-11.5T120-680q0-17 11.5-28.5T160-720h640q17 0 28.5 11.5T840-680q0 17-11.5 28.5T800-640H160Z" />
                </svg>
            </button>
            <nav
                className={`absolute top-0 left-0 -z-50 flex max-h-0 w-full items-end justify-center overflow-clip bg-[color-mix(in_srgb,#c39870_60%,#fff)] py-4 transition-all lg:hidden ${active ? "max-h-[20dvh] pt-20" : ""}`}
            >
                <ul className="scroll-none flex max-w-dvw snap-mandatory snap-center gap-6 overflow-auto px-[40dvw]">
                    {navLinkList.map((item) => {
                        return <NavLink key={item.text} {...item} />;
                    })}
                </ul>
            </nav>
        </>
    );
}
