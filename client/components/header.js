import React from 'react'
import Link from 'next/link'

const Header = ({ currentuser }) => {

    const links = [
        !currentuser && { href: '/auth/signin', lable: "Signin" },
        !currentuser && { href: '/auth/signup', lable: "Signup" },
        currentuser && { href: '/auth/logout', lable: "logout" }
    ].filter(items => items).map(({ lable, href }) => (
        <Link href={href} className='nav-item' key={href}><a className='nav-link'>{lable}</a></Link>
    ))
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between'>
            <Link href="/">
                <a className='navbar-brand'>MeMeMe</a>
            </Link>
            <div className='d-flex justify-content-end'>
                <ul className='nav d-flex align-items-center'>
                    {links}
                </ul>
            </div>
        </nav>
    )
}

export default Header