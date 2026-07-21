import FooterLinks from "./footer-links";

function Footer() {
    return (
        <footer className="bg-secondary/70 flex flex-col items-stretch gap-16 px-4 py-24 text-white lg:px-[15dvw]">
            <section className="flex flex-wrap justify-center gap-12">
                <FooterLinks />
            </section>
            <div className="flex flex-col items-center gap-2">
                <small className="block text-center text-sm uppercase">
                    &copy; All Rights Reserved 2025
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
