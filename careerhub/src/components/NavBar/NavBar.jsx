import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import './navbar.css'; // Importing CSS for styling. You need to create this file in the same directory.

const NavBar = () => {
    const lastScrollTop = useRef(0);
    const [navBarHidden, setNavBarHidden] = useState(true);

    const handleScroll = () => {
        const { pageYOffset } = window;
        if (pageYOffset > lastScrollTop.current) {
        setNavBarHidden(false);
        } else {
        setNavBarHidden(true);
        }
        lastScrollTop.current = pageYOffset;
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header>
            <img className="logo" src={logo} alt="logo" />
            <nav className={navBarHidden ? '' : 'visible'}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink exact to="/" activeClassName="active-link">
                        Home
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/about" activeClassName="active-link">
                        About
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/contact" activeClassName="active-link">
                        Contact
                    </NavLink>
                    </li>
                </ul>
            </nav>
            <a className="logout" href="http://localhost:5000/auth/logout"><button>Logout</button></a>
        </header>

    );
}; export default NavBar;