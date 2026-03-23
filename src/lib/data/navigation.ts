export interface NavLink {
    path: string
    text: string
}

export const navLinkList: NavLink[] = [
    {
        path: '/',
        text: 'Home'
    },
    {
        path: '/services',
        text: 'Services'
    },
    {
        path: '/about',
        text: 'About'
    },
    {
        path: '/reservation',
        text: 'Reservation'
    }
]