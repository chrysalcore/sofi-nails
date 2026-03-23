import { socialLinkList } from '@/lib/data/social-links'
import { navLinkList } from '@/lib/data/navigation'
import Logo from '@/components/global/logo'
import Title from '../global/title'
import Link from 'next/link'

export default function FooterLinks() {
    return (
        <>
            <div className="grow basis-32 flex flex-col gap-4 items-center">
                <h3 className="font-bold uppercase">Sections</h3>
                <ul className="flex flex-col items-center gap-2">
                {navLinkList.map(item => {
                    return (
                        <li key={item.path}>
                            <Link href={item.path}>{item.text}</Link>
                        </li>
                    )
                })}
                </ul>
            </div>
            <div className="grow basis-32 flex flex-col gap-4 items-center">
                <h3 className="font-bold uppercase">Social Links</h3>
                <ul className="flex flex-col items-center gap-2">
                {socialLinkList.map(item => {
                    return (
                        <li key={item.text}>
                            <a href={item.path} rel="noopener noreferrer">{item.text}</a>
                        </li>
                    )
                })}
                </ul>
            </div>
            <div className="grow basis-32 flex gap-6 items-center flex-row justify-center">
                <Logo className='self-center flex items-center gap-4 size-24 fill-white stroke-0' />
                <Title />
            </div> 
        </>
    )
}