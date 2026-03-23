import FooterLinks from './footer-links'

function Footer() {
    return (
        <footer className="flex flex-col gap-16 items-stretch py-24 px-4 lg:px-[15dvw] text-white bg-secondary/70">
            <section className='flex flex-wrap justify-center gap-12'>
                <FooterLinks />
            </section>
            <div className="flex flex-col items-center gap-2">
                <small className="block text-sm text-center uppercase">&copy; All Rights Reserved 2025</small>
                <small className="block text-sm text-center">Powered by <a className='text-sm font-bold underline' href="https://chrysalcore.com" rel="noopener" target="_blank">Chrysal Core</a></small>
            </div>
        </footer>
    )
}

export default Footer