import Logo from '@/components/global/logo'
import Nav from '@/components/nav/nav'
import HeaderCTA from './header-cta'
import AsideNav from '../nav/aside-nav'


export default function Header() {
    return (
        <header className="fixed grid grid-cols-2 lg:grid-cols-[20%_1fr_20%] py-3 px-4 xl:px-16 w-dvw text-white top-0 z-50 shadow-md/10">
            <Logo className='self-center flex items-center gap-4 w-7 h-7 fill-white stroke-0 z-20' />
            <Nav />
            <HeaderCTA />
            <AsideNav />
            <div className='w-full h-full bg-[color-mix(in_srgb,#c39870_70%,#fff)] absolute left-0 top-0 z-10'></div>
        </header>
    )
}