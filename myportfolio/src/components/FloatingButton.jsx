import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[var(--color-secondary)] text-[var(--color-primary)] p-4 rounded-full shadow-2xl z-50 border-2 border-white/20 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1, boxShadow: "0 20px 40px rgba(100, 255, 218, 0.3)" }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ y: 0 }}
            animate={{ y: [-2, 2, -2] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path d="M18 15l-6-6-6 6" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingButton;