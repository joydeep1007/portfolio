import React from 'react';
import { motion } from 'framer-motion';

import HTML from '../assets/html.png';
import CSS from '../assets/css.png';
import JavaScript from '../assets/javascript.png';
import ReactImg from '../assets/react.png';
import Node from '../assets/node.png';
import GitHub from '../assets/github.png';
import Tailwind from '../assets/tailwind.png';
import Mongo from '../assets/mongo.png';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.8,
    rotate: -5
  },
  show: { 
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const Skills = () => {
  const skills = [
    { name: 'HTML', icon: HTML },
    { name: 'CSS', icon: CSS },
    { name: 'JavaScript', icon: JavaScript },
    { name: 'React', icon: ReactImg },
    { name: 'GitHub', icon: GitHub },
    { name: 'Node.js', icon: Node },
    { name: 'MongoDB', icon: Mongo },
    { name: 'Tailwind', icon: Tailwind },
  ];

  return (
    <div name='skills' className='w-full min-h-screen bg-primary text-textLight py-20'>
      <div className='max-w-[1200px] mx-auto p-4 flex flex-col justify-center w-full'>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className='text-4xl sm:text-5xl font-bold inline-block border-b-4 border-secondary pb-2'>
            Skills & Technologies
          </h2>
          <p className='text-lg sm:text-xl py-6 text-textDark max-w-[700px] mx-auto'>
            These are the technologies I've worked with and continue to explore
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className='w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 text-center py-8'
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 2,
                transition: { type: "spring", stiffness: 300 }
              }}
              className='relative bg-white/5 backdrop-blur-lg rounded-xl p-6
                       shadow-lg shadow-black/10 
                       before:absolute before:inset-0 before:rounded-xl 
                       before:bg-gradient-to-r before:from-secondary/20 before:to-transparent before:opacity-0
                       hover:before:opacity-100 before:transition-opacity
                       group overflow-hidden'
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="relative z-10"
              >
                <img 
                  className='w-20 h-20 mx-auto object-contain drop-shadow-lg
                           transform transition-all duration-300' 
                  src={skill.icon} 
                  alt={`${skill.name} icon`} 
                />
              </motion.div>
              
              <motion.p 
                className='mt-4 font-semibold text-lg relative z-10
                          bg-gradient-to-r from-secondary to-blue-400 
                          bg-clip-text text-transparent'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {skill.name}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
