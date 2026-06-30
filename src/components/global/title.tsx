import localFont from 'next/font/local'

const konseric = localFont({
    src: '../../lib/fonts/Konseric.otf',
    display: 'swap',
    preload: true
})

const allura = localFont({
    src: '../../lib/fonts/Allura.ttf',
    display: 'swap',
    preload: true
})

export default function Title({ isMainTitle }: { isMainTitle?: boolean }) {
    const titleStyles = 'flex flex-col gap-4 font-konseric tracking-widest'
    const spanStyles = 'block font-allura tracking-wider'

    return (
        isMainTitle ?
        <h1 className={`text-secondary text-4xl md:text-5xl ${konseric.className} ${titleStyles}`}>Sofi<span className={`text-3xl md:text-4xl text-dark/80 ${allura.className} ${spanStyles}`}>Nails &amp; Lashes <br />Spa</span></h1>
        :
        <h2 className={`text-white text-3xl ${konseric.className} ${titleStyles}`}>Sofi<span className={`text-2xl text-white/80 ${allura.className} ${spanStyles}`}>Nails &amp; Lashes <br />Spa</span></h2>
    )
}