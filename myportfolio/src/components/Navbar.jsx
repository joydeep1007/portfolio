import React, { useState } from 'react';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { Link } from 'react-scroll';
import { useTheme } from '../context/ThemeContext';
import profilePic from '../assets/joy.jpg';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const handleClick = () => setNav(!nav);

  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center px-4 bg-[var(--color-primary)] text-[var(--color-text-light)] z-50'>
      <div className='flex items-center gap-4'>
        <div className='w-[50px] h-[50px] overflow-hidden rounded-full border-2 border-[var(--color-secondary)] hover:scale-110 transition-transform duration-300'>
          <img 
            src={profilePic}
            alt="Portfolio" 
            className='w-full h-full object-cover'
          />
        </div>
        <div>
          <h1 className='text-xl font-bold text-[var(--color-secondary)]'>Portfolio</h1>
        </div>
      </div>

      {/* menu */}
      <div className='hidden md:flex items-center'>
        <ul className='hidden md:flex mr-4'>
          <li className='relative group px-4'>            <Link to='home' smooth={true} duration={500} offset={-80} className='hover:text-[var(--color-secondary)] transition-colors duration-300'>Home</Link>
            <span className='absolute left-0 bottom-[-4px] w-full h-[2px] bg-[var(--color-secondary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
          </li>
          <li className='relative group px-4'>
            <Link to='about' smooth={true} duration={500} offset={-80} className='hover:text-[var(--color-secondary)] transition-colors duration-300'>About</Link>
            <span className='absolute left-0 bottom-[-4px] w-full h-[2px] bg-[var(--color-secondary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
          </li>
          <li className='relative group px-4'>
            <Link to='skills' smooth={true} duration={500} offset={-80} className='hover:text-[var(--color-secondary)] transition-colors duration-300'>Skills</Link>
            <span className='absolute left-0 bottom-[-4px] w-full h-[2px] bg-[var(--color-secondary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
          </li>
          <li className='relative group px-4'>
            <Link to='work' smooth={true} duration={500} offset={-80} className='hover:text-[var(--color-secondary)] transition-colors duration-300'>Work</Link>
            <span className='absolute left-0 bottom-[-4px] w-full h-[2px] bg-[var(--color-secondary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
          </li>
          <li className='relative group px-4'>
            <Link to='contact' smooth={true} duration={500} offset={-80} className='hover:text-[var(--color-secondary)] transition-colors duration-300'>Contact</Link>
            <span className='absolute left-0 bottom-[-4px] w-full h-[2px] bg-[var(--color-secondary)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></span>
          </li>
        </ul>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className='p-2 rounded-full hover:bg-[var(--color-text-dark)] hover:bg-opacity-20 transition-all duration-300 hover:scale-110'
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
        : 'absolute top-0 left-0 w-full h-screen bg-[var(--color-primary)] flex flex-col justify-center items-center'}>        <li className='py-6 text-4xl hover:text-[var(--color-secondary)]'>
          <Link onClick={handleClick} to='home' smooth={true} duration={500} offset={-80}>Home</Link>
        </li>
        <li className='py-6 text-4xl hover:text-[var(--color-secondary)]'>
          <Link onClick={handleClick} to='about' smooth={true} duration={500} offset={-80}>About</Link>
        </li>
        <li className='py-6 text-4xl hover:text-[var(--color-secondary)]'>
          <Link onClick={handleClick} to='skills' smooth={true} duration={500} offset={-80}>Skills</Link>
        </li>
        <li className='py-6 text-4xl hover:text-[var(--color-secondary)]'>
          <Link onClick={handleClick} to='work' smooth={true} duration={500} offset={-80}>Work</Link>
        </li>
        <li className='py-6 text-4xl hover:text-[var(--color-secondary)]'>
          <Link onClick={handleClick} to='contact' smooth={true} duration={500} offset={-80}>Contact</Link>
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
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105'>
            <a className='flex justify-between items-center w-full text-gray-300 px-4'
               href='https://linkedin.com'>
              LinkedIn <FaLinkedin size={30} className='animate-bounce' />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333] hover:bg-[#222222] hover:shadow-lg transform hover:scale-105'>
            <a className='flex justify-between items-center w-full text-gray-300 px-4'
               href='https://github.com/joydeep1007'>
              GitHub <FaGithub size={30} className='animate-pulse' />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#6fc2b0] hover:bg-[#5fa396] hover:shadow-lg transform hover:scale-105'>
            <a className='flex justify-between items-center w-full text-gray-300 px-4'
               href='joydeep102004@gmail.com'>
              Email <HiOutlineMail size={30} className='animate-bounce' />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#565f69] hover:bg-[#4a525a] hover:shadow-lg transform hover:scale-105'>
            <a className='flex justify-between items-center w-full text-gray-300 px-4'
               href='/resume.pdf'>
              Resume <BsFillPersonLinesFill size={30} className='animate-pulse' />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
