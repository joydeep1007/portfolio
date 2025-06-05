import React, { useEffect, useRef } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-scroll';

const Home = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const targetElement = sectionRef.current; // Store ref value
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, []);

  return (
    <div name='home' className='w-full h-screen bg-primary'>
      {/* Container */}
      <div ref={sectionRef} className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full slide-in'>
        <p className='text-secondary'>Hi, my name is</p>
        <h1 className='text-4xl sm:text-7xl font-bold text-textLight'>
          <span className='typewriter'>Joydeep De</span>
        </h1>
        <h2 className='text-4xl sm:text-7xl font-bold text-textDark'>
          I'm a Full Stack Developer.
        </h2>
        <p className='text-textDark py-4 max-w-[700px]'>
          I'm a full-stack developer specializing in building exceptional digital experiences.
          Currently, I'm focused on building responsive full-stack web applications.
        </p>        <div>
          <Link to="work" smooth={true} duration={500}>
            <button className='text-textLight group border-2 border-textLight px-6 py-3 my-2 flex items-center hover:border-secondary relative'>
              <span className='relative z-10'>View Work</span>
              <span className='group-hover:rotate-90 duration-300 relative z-10'>
                <HiArrowNarrowRight className='ml-3' />
              </span>
              <span className='absolute bottom-0 left-0 w-full h-full bg-secondary transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100'></span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
