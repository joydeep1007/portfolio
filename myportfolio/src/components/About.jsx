import React from 'react';
import { motion } from 'framer-motion';
import aboutPic from '../assets/about.png';

const About = () => {
  return (
    <div name='about' className='w-full min-h-screen bg-primary text-textLight py-16'>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='max-w-[1200px] mx-auto px-4 flex flex-col justify-center h-full'
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='mb-12 flex justify-center'
        >
          <h2 className='text-3xl sm:text-4xl font-semibold inline-block border-b-4 border-secondary pb-2 text-center'>
            About
          </h2>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-12 items-start'>
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className='flex flex-col space-y-6'
          >            <h3 className='text-2xl sm:text-3xl font-medium text-secondary'>
              Hi. I'm Joydeep De, nice to meet you. Please take a look around.            </h3>            <div className='relative w-80 h-80 sm:w-96 sm:h-96 mx-auto md:ml-8 lg:ml-12'>              <img 
                src={aboutPic} 
                alt="Joydeep De" 
                className='w-full h-full object-cover rounded-lg shadow-lg border-2 border-secondary'
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='space-y-4 text-textDark'
          >
            <p className='leading-relaxed'>
              Hello! I'm Joydeep De, a passionate and driven B.Tech student with a keen interest in cybersecurity, artificial intelligence, and cutting-edge technology. I enjoy building intelligent systems that solve real-world problems—whether it's developing smart applications, securing networks, or optimizing performance with innovative algorithms.
            </p>
            <p className='leading-relaxed'>
              With hands-on experience in Python, C, and full-stack development, I combine technical proficiency with creative thinking. I've worked on various projects involving machine learning, image processing, and optimization algorithms, and I love exploring new frameworks and tools to expand my skill set.
            </p>
            <p className='leading-relaxed'>
              I believe in continuous learning, clean code, and meaningful collaboration. Whether it's building from scratch or improving an existing system, I'm always excited to take on challenges that push me beyond my comfort zone.
            </p>
            <p className='leading-relaxed'>
              Let's connect and create something impactful together!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
