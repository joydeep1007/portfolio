import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,     // EmailJS service ID from .env
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,    // EmailJS template ID from .env
      form.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY      // EmailJS public key from .env
    )
    .then((result) => {
      console.log('SUCCESS!', result.text);
      setSubmitStatus('success');
      setIsSubmitting(false);
      form.current.reset(); // Clear the form
    }, (error) => {
      console.log('FAILED...', error.text);
      setSubmitStatus('error');
      setIsSubmitting(false);
    });
  };

  return (
    <div name='contact' className='w-full h-screen bg-[var(--color-primary)] flex justify-center items-center p-4'>
      <form ref={form} onSubmit={sendEmail} className='flex flex-col max-w-[600px] w-full'>
        <div className='pb-8'>
          <p className='text-4xl font-bold inline border-b-4 border-[var(--color-secondary)] text-[var(--color-text-light)]'>Contact</p>
          <p className='text-[var(--color-text-light)] py-4'>Submit the form below or shoot me an email - joydeep102004@gmail.com</p>
        </div>
        
        <input 
          className='p-2 bg-white dark:bg-[#1f2937] text-[var(--color-text-light)] border border-gray-300 dark:border-gray-600 focus:border-[var(--color-secondary)] outline-none rounded' 
          type="text" 
          placeholder='Name' 
          name='user_name'
          required
        />
        
        <input 
          className='my-4 p-2 bg-white dark:bg-[#1f2937] text-[var(--color-text-light)] border border-gray-300 dark:border-gray-600 focus:border-[var(--color-secondary)] outline-none rounded' 
          type="email" 
          placeholder='Email' 
          name='user_email'
          required
        />
        
        <textarea 
          className='p-2 bg-white dark:bg-[#1f2937] text-[var(--color-text-light)] border border-gray-300 dark:border-gray-600 focus:border-[var(--color-secondary)] outline-none rounded' 
          name="message" 
          rows="10" 
          placeholder='Message'
          required
        ></textarea>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <p className='text-green-500 text-center mt-4'>✅ Message sent successfully! I'll get back to you soon.</p>
        )}
        {submitStatus === 'error' && (
          <p className='text-red-500 text-center mt-4'>❌ Failed to send message. Please try again or email me directly.</p>
        )}
        
        <button 
          type="submit"
          disabled={isSubmitting}
          className={`text-[var(--color-text-light)] border-2 border-[var(--color-text-light)] bg-transparent px-4 py-3 my-8 mx-auto flex items-center transition-all duration-300 hover:bg-[var(--color-secondary)] hover:border-[var(--color-secondary)] hover:text-[var(--color-primary)] rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Sending...' : "Let's Collaborate"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
