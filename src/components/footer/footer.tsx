import FooterLinks from "./footer-links";
import { CurveDivider } from "../global/curve-divider";

function Footer() {
    return (
        <footer className="bg-deep relative flex flex-col items-stretch gap-16 overflow-clip px-4 pt-32 pb-24 text-white md:pt-44 lg:px-[15dvw]">
            <CurveDivider edge="top" />
            <section className="flex flex-wrap justify-center gap-12">
                <FooterLinks />
            </section>
            <div className="flex flex-col items-center gap-2">
                <small className="block text-center text-sm uppercase">
                    &copy; All Rights Reserved {new Date().getFullYear()}
                </small>
                <small className="block text-center text-sm">
                    Powered by{" "}
                    <a
                        className="text-sm font-bold underline"
                        href="https://chrysalcore.com"
                        rel="noopener"
                        target="_blank"
                    >
                        Chrysal Core
                    </a>
                </small>
            </div>
        </footer>
    );
}

export default Footer;
