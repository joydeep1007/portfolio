import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`w-full ${isDarkMode ? 'bg-primary text-textLight' : 'bg-white text-gray-800'} py-8 transition-colors duration-300`}>
      <div className='max-w-[1000px] mx-auto px-8'>
        <div className='grid md:grid-cols-3 gap-8'>
          {/* Quick Links */}
          <div>
            <h3 className='text-2xl font-bold text-secondary mb-4'>Quick Links</h3>
            <ul>
              <li className='py-2'>
                <Link to='home' smooth={true} duration={500} className='hover:text-secondary cursor-pointer'>
                  Home
                </Link>
              </li>
              <li className='py-2'>
                <Link to='about' smooth={true} duration={500} className='hover:text-secondary cursor-pointer'>
                  About
                </Link>
              </li>
              <li className='py-2'>
                <Link to='skills' smooth={true} duration={500} className='hover:text-secondary cursor-pointer'>
                  Skills
                </Link>
              </li>
              <li className='py-2'>
                <Link to='work' smooth={true} duration={500} className='hover:text-secondary cursor-pointer'>
                  Work
                </Link>
              </li>
              <li className='py-2'>
                <Link to='contact' smooth={true} duration={500} className='hover:text-secondary cursor-pointer'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className='text-2xl font-bold text-secondary mb-4'>Connect</h3>
            <ul>
              <li className='py-2'>
                <a href='https://linkedin.com' target='_blank' rel='noreferrer' 
                   className='flex items-center hover:text-secondary'>
                  <FaLinkedin className='mr-2' /> LinkedIn
                </a>
              </li>
              <li className='py-2'>
                <a href='https://github.com/joydeep1007' target='_blank' rel='noreferrer'
                   className='flex items-center hover:text-secondary'>
                  <FaGithub className='mr-2' /> GitHub
                </a>
              </li>              <li className='py-2'>
                <a href='mailto:joydeep102004@gmail.com'
                   className='flex items-center hover:text-secondary'>
                  <HiOutlineMail className='mr-2' /> Email
                </a>
              </li>
              <li className='py-2'>
                <a href='https://docs.google.com/document/d/1NcBy3GrK06XteTAIZrKDjBP-hexy6e3Z/edit?usp=sharing&ouid=108353958671612217925&rtpof=true&sd=true' target='_blank' rel='noreferrer'
                   className='flex items-center hover:text-secondary'>
                  <BsFillPersonLinesFill className='mr-2' /> Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-2xl font-bold text-secondary mb-4'>Contact Info</h3>
            <p className='py-2'>Location: Kolkata, India</p>
            <p className='py-2'>Email: joydeep102004@gmail.com</p>
            <p className='py-2'>Phone: +91 9163805618</p>
          </div>
        </div>

        {/* Copyright */}
        <div className={`text-center pt-8 mt-8 border-t ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
          <p>&copy; {new Date().getFullYear()} Joydeep's Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
