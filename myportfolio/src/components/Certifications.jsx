import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Certifications = () => {
  const { isDarkMode } = useTheme();
  
  const certifications = [
    {
      id: 1,
      name: "Machine Learning Specialization",
      issuer: "Coursera - Stanford University",
      date: "2023",
      link: "https://www.coursera.org/account/accomplishments/specialization/certificate/XXXXX"
    },
    {
      id: 2,
      name: "Deep Learning Specialization",
      issuer: "Coursera - DeepLearning.AI",
      date: "2023",
      link: "https://www.coursera.org/account/accomplishments/specialization/certificate/XXXXX"
    },
    {
      id: 3,
      name: "React - The Complete Guide",
      issuer: "Udemy",
      date: "2023",
      link: "https://www.udemy.com/certificate/XXXXX"
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
              className={`p-6 ${isDarkMode ? 'bg-[#0a192f] shadow-[#040c16]' : 'bg-white shadow-gray-400'} 
              rounded-lg shadow-md hover:scale-105 duration-500`}
            >
              <h3 className='text-xl font-bold mb-2'>{cert.name}</h3>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
