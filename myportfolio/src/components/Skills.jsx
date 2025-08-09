import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Optional icons (kept for web/dev chips when available)
import HTML from '../assets/html.png';
import CSS from '../assets/css.png';
import JavaScript from '../assets/javascript.png';
import ReactImg from '../assets/react.png';
import Node from '../assets/node.png';
import GitHub from '../assets/github.png';
import Tailwind from '../assets/tailwind.png';
import Mongo from '../assets/mongo.png';
import Python from '../assets/skills/python.svg';
import Java from '../assets/skills/java.svg';
import CIcon from '../assets/skills/c.svg';
import SQLIcon from '../assets/skills/sql.svg';
import PostgreSQL from '../assets/skills/postgreSQL.png';

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
  // Categories for tabs
  const categories = [
    { key: 'core', label: 'Core Technologies', icon: '📚' },
    { key: 'web', label: 'Web Development', icon: '🌐' },
    { key: 'data', label: 'Data Engineering & ML', icon: '🧠' },
    { key: 'db', label: 'Database Systems', icon: '🗄️' },
    { key: 'devops', label: 'DevOps & Cloud', icon: '☁️' },
    { key: 'other', label: 'Other Technical Skills', icon: '🛠️' },
  ];

  // Skills grouped by category; icon may be an image (png) or an emoji/text
  const skillsByCategory = useMemo(() => ({
    core: [
      { name: 'Python', icon: Python },
      { name: 'Java', icon: Java },
      { name: 'C', icon: CIcon },
      { name: 'JavaScript', icon: JavaScript },
      { name: 'SQL', icon: SQLIcon },
      { name: 'Unix/Linux', emoji: '🐧' },
    ],
    web: [
      { name: 'HTML', icon: HTML },
      { name: 'CSS', icon: CSS },
      { name: 'JavaScript', icon: JavaScript },
      { name: 'React', icon: ReactImg },
      { name: 'Tailwind CSS', icon: Tailwind },
      { name: 'Node.js', icon: Node },
    ],
    data: [
      { name: 'Python', icon: Python },
      { name: 'NumPy', emoji: '📐' },
      { name: 'Pandas', emoji: '🧾' },
      { name: 'scikit-learn', emoji: '📊' },
      { name: 'TensorFlow', emoji: '🟧' },
      { name: 'OpenCV', emoji: '👁️' },
    ],
    db: [
      { name: 'MySQL', emoji: '🐬' },
      { name: 'MongoDB', icon: Mongo },
      { name: 'SQLite', emoji: '🧱' },
      { name: 'PostgreSQL', icon: PostgreSQL }
    ],
  devops: [
      { name: 'Git', emoji: '🔧' },
      { name: 'GitHub', icon: GitHub },
      { name: 'Docker', emoji: '🐳' },
      { name: 'CI/CD', emoji: '🔁' },
      { name: 'AWS (Basics)', emoji: '☁️' },
      { name: 'Vercel/Netlify', emoji: '🚀' },
    ],
    other: [
      { name: 'Data Structures & Algorithms', emoji: '🧠' },
      { name: 'OOP', emoji: '🧱' },
      { name: 'REST APIs', emoji: '🔗' },
      { name: 'Socket Programming', emoji: '🔌' },
      { name: 'Cybersecurity Basics', emoji: '🛡️' },
      { name: 'NLP / CV', emoji: '🗣️' },
    ],
  }), []);

  const [selected, setSelected] = useState('core');
  const skills = skillsByCategory[selected];

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
            Skills & Expertise
          </h2>
          <p className='text-lg sm:text-xl py-6 text-textDark max-w-[900px] mx-auto'>
            Continuously expanding my skill set through self-learning, formal education, and hands-on projects.
            My abilities span multiple domains with a focus on software development and data engineering.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className='w-full flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-8'>
          {categories.map((cat) => {
            const active = selected === cat.key;
            return (
              <motion.button
                key={cat.key}
                onClick={() => setSelected(cat.key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className={
                  `px-5 py-3 rounded-full text-sm sm:text-base transition-colors duration-200 ` +
                  (active
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                    : 'bg-transparent text-textLight border border-white/30 hover:border-white/60')
                }
              >
                <span className='mr-2'>{cat.icon}</span>
                {cat.label}
              </motion.button>
            );
          })}
        </div>

        {/* Skills Grid (cards) - re-animate on category change */}
        <AnimatePresence mode='wait'>
          <motion.div 
            key={selected}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: 10 }}
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
                  {skill.icon ? (
                    <img 
                      className='w-20 h-20 mx-auto object-contain drop-shadow-lg transform transition-all duration-300' 
                      src={skill.icon} 
                      alt={`${skill.name} icon`} 
                    />
                  ) : (
                    <div className='w-20 h-20 mx-auto flex items-center justify-center text-4xl'>
                      {skill.emoji}
                    </div>
                  )}
                </motion.div>
                
                <motion.p 
                  className='mt-4 font-semibold text-lg relative z-10 bg-gradient-to-r from-secondary to-blue-400 bg-clip-text text-transparent'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {skill.name}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Skills;
