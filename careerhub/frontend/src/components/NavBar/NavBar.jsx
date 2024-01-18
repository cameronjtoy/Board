import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import './navbar.css'; // Importing CSS for styling. You need to create this file in the same directory.

const NavBar = () => {
    const lastScrollTop = useRef(0);
    const [navBarHidden, setNavBarHidden] = useState(true);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > lastScrollTop.current) {
            setNavBarHidden(true); // navbar should be hidden when scrolling down
        } else {
            setNavBarHidden(false); // navbar should be visible when scrolling up
        }
        lastScrollTop.current = scrollY;
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
                    <NavLink to="/profile" activeClassName="active-link">
                        Profile
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/form" activeClassName="active-link">
                        Form
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/dashboard" activeClassName="active-link">
                        Dashboard
                    </NavLink>
                    </li>
                </ul>
            </nav>
            <div className="dropdown">
                <div className="content">
                    <span className="material-symbols-outlined">settings</span>
                    <p>Settings</p>
                    <span className="material-symbols-outlined">expand_more</span>
            </div>
            {/* <button type="button"></button>
            <div className="menu">
                <a href="http://localhost:3000/profile">
                <span className="material-symbols-outlined">Profile</span>
                <p>Profile</p>
                </a>
                <a href="http://localhost:3000/settings">
                <span className="material-symbols-outlined">Settings</span>
                <p>Settings</p>
                </a>
                <a href="http://localhost:3000/logout">
                <span className="material-symbols-outlined">Logout</span>
                <p>Logout</p>
                </a>
            </div> */}
            </div>
        </header>

    );
}; export default NavBar;