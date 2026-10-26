import Logo from "@/components/global/logo";
import Nav from "@/components/nav/nav";
import HeaderCTA from "./header-cta";
import AsideNav from "../nav/aside-nav";

export default function Header() {
    return (
        <header className="shadow-on-scroll text-dark fixed inset-x-0 top-0 z-50 grid grid-cols-2 px-4 py-3 lg:grid-cols-[20%_1fr_20%] xl:px-16">
            <Logo className="fill-secondary z-20 flex h-7 w-7 items-center gap-4 self-center stroke-0" />
            <Nav />
            <HeaderCTA />
            <AsideNav />
            <div className="absolute top-0 left-0 z-10 h-full w-full bg-white"></div>
        </header>
    );
}
