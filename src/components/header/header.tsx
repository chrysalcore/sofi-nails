import Logo from "@/components/global/logo";
import Nav from "@/components/nav/nav";
import HeaderCTA from "./header-cta";
import AsideNav from "../nav/aside-nav";

export default function Header() {
    return (
        <header className="fixed top-0 z-50 grid w-dvw grid-cols-2 px-4 py-3 text-white shadow-md/10 lg:grid-cols-[20%_1fr_20%] xl:px-16">
            <Logo className="z-20 flex h-7 w-7 items-center gap-4 self-center fill-white stroke-0" />
            <Nav />
            <HeaderCTA />
            <AsideNav />
            <div className="absolute top-0 left-0 z-10 h-full w-full bg-[color-mix(in_srgb,#c39870_70%,#fff)]"></div>
        </header>
    );
}
