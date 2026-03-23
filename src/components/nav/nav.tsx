import NavLink from './nav-link'
import { navLinkList } from '../../lib/data/navigation'

export default function Nav() {
    return (
        <nav className='hidden lg:flex justify-center items-center p-0 z-20'>
            <ul className="flex gap-6">
            {navLinkList.map(item => {
                return (
                    <NavLink key={item.text} {...item} />
                )
            })}
            </ul>
        </nav>
    )
}