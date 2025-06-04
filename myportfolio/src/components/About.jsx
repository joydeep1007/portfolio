import React from 'react';

const About = () => {
  return (
    <div name='about' className='w-full h-screen bg-primary text-textLight'>
      <div className='flex flex-col justify-center items-center w-full h-full'>
        <div className='max-w-[1000px] w-full grid grid-cols-2 gap-8'>
          <div className='sm:text-right pb-8 pl-4'>
            <p className='text-4xl font-bold inline border-b-4 border-secondary'>
              About
            </p>
          </div>
          <div></div>
        </div>
        <div className='max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4'>
          <div className='sm:text-right text-4xl font-bold'>
            <p>Hi. I'm Joydeep De, nice to meet you. Please take a look around.</p>
          </div>
          <div>
            <p>Hello! I’m Joydeep De, a passionate and driven B.Tech student with a keen interest in cybersecurity, artificial intelligence, and cutting-edge technology. I enjoy building intelligent systems that solve real-world problems—whether it's developing smart applications, securing networks, or optimizing performance with innovative algorithms.

With hands-on experience in Python, C, and full-stack development, I combine technical proficiency with creative thinking. I’ve worked on various projects involving machine learning, image processing, and optimization algorithms, and I love exploring new frameworks and tools to expand my skill set.

I believe in continuous learning, clean code, and meaningful collaboration. Whether it's building from scratch or improving an existing system, I’m always excited to take on challenges that push me beyond my comfort zone.

Let’s connect and create something impactful together!

</p>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
