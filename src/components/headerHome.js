import React, { useState, useEffect } from 'react';
import '../css/header.css';
import '../css/careers.css';
import images from '../utils/images';
import { BsTelephoneForwardFill } from "react-icons/bs";
import { HiMenu, HiX } from "react-icons/hi";

const SESSION_DURATION = 14 * 24 * 60 * 60 * 1000; // 2 weeks

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('sgs_token');
        const loginTime = localStorage.getItem('sgs_login_time');

        if (token && loginTime) {
            const elapsed = Date.now() - Number(loginTime);
            if (elapsed > SESSION_DURATION) {
                localStorage.removeItem('sgs_token');
                localStorage.removeItem('sgs_admin');
                localStorage.removeItem('sgs_login_time');
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
            }
        } else if (token && !loginTime) {
            // Token exists but no timestamp — set one now
            localStorage.setItem('sgs_login_time', String(Date.now()));
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
      <>
        <div className="hiring-banner">
          🔥 Southern Gas Solutions is now hiring for gas jobs!
          <a href="/careers">Apply Today</a>
        </div>
        <header className="header">
            <a href="/" className="logo">
                <img src={images['Southern-Gas-Solutions.svg']} alt="Southern Gas Solutions" />
            </a>
            <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <HiX /> : <HiMenu />}
            </button>
            <nav className={`nav ${isOpen ? 'open' : ''}`}>
                <ul className="nav-list">
                    <li className="dropdown">
                        <a className="main-nav-view" href="/">Home</a>
                        <a className="main-nav" href="/services">Services</a>
                        <ul className="dropdown-menu">
                            <li><a href="/services/gas-line-installation">Gas Line Installation</a></li>
                            <li><a href="/services/gas-line-repairs">Gas Line Repairs</a></li>
                            <li><a href="/services/propane-systems">Propane Systems</a></li>
                            <li><a href="/services/tankless-water-heaters">Tankless Water Heaters</a></li>
                            <li><a href="/services/commercial-gas-piping">Commercial Gas Piping</a></li>
                            <li><a href="/services/emergency-gas-service">Emergency Gas Service</a></li>
                            <li><a href="/services/gas-logs-fireplaces">Gas Logs & Fireplaces</a></li>
                        </ul>
                    </li>
                    <li><a className="main-nav" href="/about">About</a></li>
                    <li><a className="main-nav" href="/our-work">Our Work</a></li>
                    <li><a className="main-nav" href="/service-areas">Service Areas</a></li>
                    <li><a className="main-nav" href="/careers">Careers</a></li>
                    <li><a className="main-nav" href="/contact">Contact Us</a></li>
                    {isLoggedIn ? (
                        <li><a className="main-nav" href="/admin-dashboard" style={{fontSize:'0.85rem',color:'var(--orange)'}}>📊 Dashboard</a></li>
                    ) : (
                        <li><a className="main-nav" href="/admin-login" style={{fontSize:'0.85rem',opacity:0.6}}>🔒 Admin</a></li>
                    )}
                </ul>
                <div className="nav-number">
                    <BsTelephoneForwardFill className="nav-icon"/>
                    <div className="nav-number-icon">
                    <p>Call Now 24/7</p>
                    <a href="tel:4048623911">(404)862-3911</a>
                    </div>
                </div>
            </nav>
        </header>
      </>
    );
}

export default Header;
