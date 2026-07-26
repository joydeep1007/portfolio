import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef(null);

  // Controlled form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const API_BASE = process.env.REACT_APP_API_URL || '';

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    setIsSubmitting(true);
    setStatus('idle');
    setErrorMsg('');
    console.log('[Contact] submit started');

    try {
      // 1) Send email via EmailJS (frontend)
      // Ensure your EmailJS template expects: user_name, user_email, message
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing EmailJS environment variables.');
      }

      // You can use send() or sendForm(). Using send() with explicit params here:
      await emailjs.send(
        serviceId,
        templateId,
        {
          user_name: name.trim(),
          user_email: email.trim(),
          message: message.trim(),
        },
        { publicKey }
      );

      console.log('[Contact] EmailJS send: success');

      // 2) Save to backend (MongoDB)
      const payload = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      };

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) {
        console.error('[Contact] Backend save failed:', data);
        throw new Error(data?.message || 'Failed to save message in backend.');
      }

      console.log('[Contact] Backend save: success', data);

      // Success: reset form
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      formRef.current?.reset();
    } catch (err) {
      console.error('[Contact] submit error:', err);
      setStatus('error');
      setErrorMsg(err?.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div name="contact" className="w-full min-h-screen bg-[var(--color-primary)] flex justify-center items-center p-4">
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col max-w-[600px] w-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-[var(--color-secondary)] text-[var(--color-text-light)]">
            Contact
          </p>
          <p className="text-[var(--color-text-light)] py-4">
            Submit the form below or email me at joydeep102004@gmail.com
          </p>
        </div>

        <input
          className="p-2 bg-white dark:bg-[#1f2937] text-[var(--color-text-light)] border border-gray-300 dark:border-gray-600 focus:border-[var(--color-secondary)] outline-none rounded"
          type="text"
          placeholder="Name"
          name="user_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isSubmitting}
        />

        <input
          className="my-4 p-2 bg-white dark:bg-[#1f2937] text-[var(--color-text-light)] border border-gray-300 dark:border-gray-600 focus:border-[var(--color-secondary)] outline-none rounded"
          type="email"
          placeholder="Email"
          name="user_email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />

        <textarea
          className="p-2 bg-white dark:bg-[#1f2937] text-[var(--color-text-light)] border border-gray-300 dark:border-gray-600 focus:border-[var(--color-secondary)] outline-none rounded"
          name="message"
          rows="10"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={isSubmitting}
        />

        {status === 'success' && (
          <p className="text-green-500 text-center mt-4">
            ✅ Message sent successfully, will get back to you soon asap!
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-500 text-center mt-4">
            ❌ Failed to send or save. {errorMsg || 'Please try again.'}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`text-[var(--color-text-light)] border-2 border-[var(--color-text-light)] bg-transparent px-4 py-3 my-8 mx-auto flex items-center transition-all duration-300 hover:bg-[var(--color-secondary)] hover:border-[var(--color-secondary)] hover:text-[var(--color-primary)] rounded ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Sending...' : "Let's Collaborate"}
        </button>
      </form>
    </div>
  );
};

export default Contact;
