import NavLink from "./nav-link";
import { navLinkList } from "../../lib/data/navigation";

export default function Nav() {
    return (
        <nav className="z-20 hidden items-center justify-center p-0 lg:flex">
            <ul className="flex gap-6">
                {navLinkList.map((item) => {
                    return <NavLink key={item.text} {...item} />;
                })}
            </ul>
        </nav>
    );
}
