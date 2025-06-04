import React, { useState } from 'react';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const handleClick = () => setNav(!nav);

  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center px-4 bg-[var(--color-primary)] text-[var(--color-text-light)]'>
      <div>
        <h1 className='text-4xl font-bold text-[var(--color-secondary)]'>Portfolio</h1>
      </div>

      {/* menu */}
      <div className='hidden md:flex items-center'>
        <ul className='hidden md:flex mr-4'>
          <li className='hover:text-[var(--color-secondary)]'>
            <Link to='home' smooth={true} duration={500}>Home</Link>
          </li>
          <li className='hover:text-[var(--color-secondary)]'>
            <Link to='about' smooth={true} duration={500}>About</Link>
          </li>
          <li className='hover:text-[var(--color-secondary)]'>
            <Link to='skills' smooth={true} duration={500}>Skills</Link>
          </li>
          <li className='hover:text-[var(--color-secondary)]'>
            <Link to='work' smooth={true} duration={500}>Work</Link>
          </li>
          <li className='hover:text-[var(--color-secondary)]'>
            <Link to='contact' smooth={true} duration={500}>Contact</Link>
          </li>
        </ul>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className='p-2 rounded-full hover:bg-[var(--color-text-dark)] hover:bg-opacity-20 transition-colors duration-200'
          aria-label='Toggle theme'
        >
          {isDarkMode ? (
            <FaSun className='text-yellow-400 text-xl' />
          ) : (
            <FaMoon className='text-gray-700 text-xl' />
          )}
        </button>
      </div>

      {/* Hamburger */}
      <div onClick={handleClick} className='md:hidden z-10 cursor-pointer'>
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu */}
      <ul className={!nav 
        ? 'hidden' 
        : 'absolute top-0 left-0 w-full h-screen bg-[var(--color-primary)] flex flex-col justify-center items-center'}>
        <li className='py-6 text-4xl hover:text-[var(--color-secondary)]'>
          <Link onClick={handleClick} to='home' smooth={true} duration={500}>Home</Link>
        </li>
        <li className='py-6 text-4xl hover:text-[var(--color-secondary)]'>
          <Link onClick={handleClick} to='about' smooth={true} duration={500}>About</Link>
        </li>
        <li className='py-6 text-4xl hover:text-[var(--color-secondary)]'>
          <Link onClick={handleClick} to='skills' smooth={true} duration={500}>Skills</Link>
        </li>
        <li className='py-6 text-4xl hover:text-[var(--color-secondary)]'>
          <Link onClick={handleClick} to='work' smooth={true} duration={500}>Work</Link>
        </li>
        <li className='py-6 text-4xl hover:text-[var(--color-secondary)]'>
          <Link onClick={handleClick} to='contact' smooth={true} duration={500}>Contact</Link>
        </li>
        {/* Mobile Theme Toggle */}
        <li className='py-6 text-4xl'>
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full hover:bg-[var(--color-text-dark)] hover:bg-opacity-20 transition-colors duration-200'
            aria-label='Toggle theme'
          >
            {isDarkMode ? (
              <FaSun className='text-yellow-400 text-xl' />
            ) : (
              <FaMoon className='text-gray-700 text-xl' />
            )}
          </button>
        </li>
      </ul>

      {/* Social icons */}
      <div className='hidden lg:flex fixed flex-col top-[35%] left-0'>
        <ul>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600'>
            <a className='flex justify-between items-center w-full text-gray-300'
               href='https://linkedin.com'>
              LinkedIn <FaLinkedin size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]'>
            <a className='flex justify-between items-center w-full text-gray-300'
               href='https://github.com'>
              GitHub <FaGithub size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#6fc2b0]'>
            <a className='flex justify-between items-center w-full text-gray-300'
               href='mailto:example@email.com'>
              Email <HiOutlineMail size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#565f69]'>
            <a className='flex justify-between items-center w-full text-gray-300'
               href='/resume.pdf'>
              Resume <BsFillPersonLinesFill size={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
