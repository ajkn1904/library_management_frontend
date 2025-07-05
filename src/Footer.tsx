import { Facebook, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-gray-800 text-white">
            <div className="sm:flex flex-col lg:flex-row justify-evenly items-center">
            <div className="grid grid-flow-col gap-6 m-2">
                <Link to='/' className="link link-hover">About us</Link>
                <Link to='/' className="link link-hover">Contact</Link>
                <Link to='/' className="link link-hover">Privacy & Policy</Link>
            </div>
            <div>
                <div className="grid grid-flow-col gap-6">
                    <a href='https://twitter.com/' target='_blank' rel="noreferrer"><Twitter className='w-6 h-6' /></a>

                    <a href='https://www.youtube.com/' target='_blank' rel='noreferrer'><Youtube className='w-6 h-6' /></a>

                    <a href='https://www.facebook.com/' target='_blank' rel='noreferrer'><Facebook className='w-6 h-6' /></a>
                </div>
            </div>
            </div>
            <div className="text-center mt-5">
                <small>© 2025 || Anika Jumana Khanam</small>
            </div>
        </footer>
    );

};

export default Footer;