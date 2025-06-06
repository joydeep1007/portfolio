import React from 'react';
import WorkImg from '../assets/projects/workImg.jpeg';
import DrowsyImg from '../assets/projects/drowsy.png';
import ResumeImg from '../assets/projects/resume.png';
import { useTheme } from '../context/ThemeContext';

const Work = () => {
  const { isDarkMode } = useTheme();
  const projects = [
    {
      id: 1,
      name: "React JS Application",
      image: WorkImg,
      codeLink: "https://github.com/yourusername/project1",
      description: "A full-stack React application"
    },
    {
      id: 2,
      name: "Drowseiness- detection",
      image: DrowsyImg,
      codeLink: "https://github.com/joydeep1007/drowsiness_detection-app.git",
      description: "Drowsiness detection system using computer vision"
    },    {
      id: 3,
      name: "Portfolio Website",
      image: WorkImg,
      codeLink: "https://github.com/joydeep1007/portfolio.git",
      description: "Personal portfolio website"
    },
    {
      id: 4,
      name: "Simple chat app using socket.io",
      image: WorkImg,
      codeLink: "https://github.com/joydeep1007/chat_app-using-python.git",
      description: "Real-time chat application using Socket.IO"
    },    {
      id: 5,
      name: "Resume- Optimizer",
      image: ResumeImg,
      codeLink: "https://github.com/joydeep1007/resume_optimizer.git",
      description: "Resume optimization tool using AI"
    },
    {
      id: 6,
      name: "Text to voice generator",
      image: WorkImg,
      codeLink: "https://github.com/joydeep1007/text-to-voice-generator.git",
      description: "Text-to-speech application using javascript in built api"
    }
  ];

  return (
    <div name='work' className='w-full md:h-screen bg-[var(--color-primary)] text-[var(--color-text-light)]'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-[var(--color-secondary)]'>
            Work
          </p>
          <p className='py-6 text-[var(--color-text-dark)]'>Check out some of my recent work</p>
        </div>

        {/* Container for projects */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {/* Project Items */}
          {projects.map((project) => (
            <div
              key={project.id}
              style={{ backgroundImage: `url(${project.image})` }}
              className={`shadow-lg ${isDarkMode ? 'shadow-[#040c16]' : 'shadow-gray-400'} group container rounded-md flex justify-center items-center mx-auto content-div`}
            >
              {/* Hover Effects */}
              <div className='opacity-0 group-hover:opacity-100 text-center'>
                <span className='text-2xl font-bold text-white tracking-wider'>
                  {project.name}
                </span>
                <p className='text-white mt-2'>{project.description}</p>
                <div className='pt-8 text-center'>
                  <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                    <button className='text-center rounded-lg px-4 py-3 m-2 bg-white text-gray-700 font-bold text-lg hover:bg-[var(--color-secondary)] hover:text-white'>
                      View Code
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
