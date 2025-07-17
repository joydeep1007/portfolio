import React from 'react';
import { useTheme } from '../context/ThemeContext';
import infosysLogo from '../assets/certifications/infosys.png';

const Certifications = () => {
  const { isDarkMode } = useTheme();
  
  const certifications = [
    {
      id: 1,
      name: "Intro to Data Science",
      issuer: "Infosys Springboard",
      date: "2025",
      link: "https://drive.google.com/file/d/1lRwwWm3ihfrLkjnRt89M3BHM-S0xGw2t/view?usp=sharing"
    },
    {
      id: 2,
      name: "Introduction to Robotic Process Automation",
      issuer: "Infosys Springboard",
      date: "2025",
      link: "https://drive.google.com/file/d/1B0GEn1AMbF52zOJBsWhW0jTVB3G4XWix/view?usp=sharing"
    },
    {
      id: 3,
      name: "Introduction to Deep Learning",
      issuer: "Infosys Springboard",
      date: "2025",
      link: "https://drive.google.com/file/d/1j8wxeMG5txQ3-YCwd83wbhVrSzxTXxR3/view?usp=sharing"
    },
    {
      id: 4,
      name: "Introduction to AI",
      issuer: "Infosys Springboard",
      date: "2025",
      link: "https://drive.google.com/file/d/1z2D2uoiPtBxgBiQUF6M_z6Ej48KQfvA-/view?usp=sharing"
    },
    {
      id: 5,
      name: "Introduction to NLP",
      issuer: "Infosys Springboard",
      date: "2025",
      link: "https://drive.google.com/file/d/1gQr20YPVZnGNSjdvsWrVcX325bv0l0Zm/view?usp=sharing"
    },
    {
      id: 6,
      name: "Computer Vision 101",
      issuer: "Infosys Springboard",
      date: "2025",
      link: "https://drive.google.com/file/d/1uTXYe9CVO1fh4V5HJ8JCRt3mRcU7904Z/view?usp=sharing"
    }
  ];

  return (
    <div name='certifications' className='w-full md:h-screen bg-[var(--color-primary)] text-[var(--color-text-light)]'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-[var(--color-secondary)]'>
            Certifications
          </p>
          <p className='py-6 text-[var(--color-text-dark)]'>These are my recent certifications and achievements</p>
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`relative p-6 ${isDarkMode ? 'bg-[#0a192f] shadow-[#040c16]' : 'bg-white shadow-gray-400'} 
              rounded-lg shadow-md hover:scale-105 duration-500 overflow-hidden group`}
            >
              {/* Background overlay for better text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:backdrop-blur-sm transition-all duration-300"></div>
              
              {/* Content overlay */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <h3 className='text-xl font-bold flex-1'>{cert.name}</h3>
                  <img 
                    src={infosysLogo} 
                    alt="Infosys" 
                    className="w-8 h-8 ml-2 opacity-70"
                  />
                </div>
                <p className='text-[var(--color-text-dark)] mb-2'>{cert.issuer}</p>
                <p className='text-[var(--color-secondary)] mb-4'>{cert.date}</p>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='text-[var(--color-secondary)] hover:underline'
                >
                  View Certificate →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
