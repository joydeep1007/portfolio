import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--color-primary)] text-[var(--color-text-light)] transition-colors duration-300">
        <Navbar />
        <Home />
        <About />
        <Skills />
        <Work />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
