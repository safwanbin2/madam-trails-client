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
                    <p>XYZ Industries Ltd.<br />Providing reliable products since 2023</p>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </div>
                <div>
                    <span className="footer-title">Company</span>
                    <Link to="/aboutus" className="link link-hover">About us</Link>
                    <Link to="/contactus" className="link link-hover">Contact</Link>
                    <Link to="/contactus" className="link link-hover">Jobs</Link>
                </div>
                <div>
                    <span className="footer-title">Legal</span>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;