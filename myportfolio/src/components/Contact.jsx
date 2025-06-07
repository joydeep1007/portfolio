import React from 'react'

const Contact = () => {
  return (
    <div name='contact' className='w-full h-screen bg-primary flex justify-center items-center p-4'>
        <form method='POST' action="https://getform.io/f/YOUR-FORM-ID" className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-secondary text-textLight'>Contact</p>
                <p className='text-textLight py-4'>Submit the form below or shoot me an email - joydeep102004@gmail.com</p>
            </div>            <input 
                className='p-2 bg-white dark:bg-[#1f2937] text-textLight border border-gray-300 dark:border-gray-600 focus:border-secondary outline-none' 
                type="text" 
                placeholder='Name' 
                name='name' 
            />
            <input 
                className='my-4 p-2 bg-white dark:bg-[#1f2937] text-textLight border border-gray-300 dark:border-gray-600 focus:border-secondary outline-none' 
                type="email" 
                placeholder='Email' 
                name='email' 
            />
            <textarea 
                className='p-2 bg-white dark:bg-[#1f2937] text-textLight border border-gray-300 dark:border-gray-600 focus:border-secondary outline-none' 
                name="message" 
                rows="10" 
                placeholder='Message'
            ></textarea>
            <button className='text-textLight border-2 border-textLight bg-transparent px-4 py-3 my-8 mx-auto flex items-center transition-all duration-300 hover:bg-secondary hover:border-secondary hover:text-primary'>Let's Collaborate</button>
        </form>
    </div>
  )
}

export default Contact
