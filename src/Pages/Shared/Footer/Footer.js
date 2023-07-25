import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-base-100 '>
            <div className="footer py-10  text-base-content w-11/12 mx-auto">
                <div>
                    <Link className='text-primary text-xl uppercase font-bold tracking-wider' to="/">
                        <h2 className="">MadamTrails</h2>
                    </Link>
                    <p><br />Providing reliable products since 2023</p>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <Link className="link link-hover">Branding</Link>
                    <Link className="link link-hover">Design</Link>
                    <Link className="link link-hover">Marketing</Link>
                    <Link className="link link-hover">Advertisement</Link>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <Link to="/aboutus" className="link link-hover">About us</Link>
                    <Link to="/contactus" className="link link-hover">Contact</Link>
                    <Link to="/jobs" className="link link-hover">Jobs</Link>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <Link to="/termsofuse" className="link link-hover">Terms of use</Link>
                    <Link to="/privacypolicy" className="link link-hover">Privacy policy</Link>
                    <Link to="/cookiepolicy" className="link link-hover">Cookie policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;