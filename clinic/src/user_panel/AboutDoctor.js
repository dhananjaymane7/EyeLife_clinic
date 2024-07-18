import React from 'react';
import doctor from './assets/doctor.jpg'

const AboutDoctor = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
        {/* Image Section */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <img
              src={doctor}
              alt="Dr. Jane Doe"
              width="400"
              height="400"
              className="rounded-lg shadow-lg"
              style={{ aspectRatio: '400 / 400', objectFit: 'cover' }}
            />
          </div>
        </div>
        
        {/* Content Section */}
        <div className="space-y-6">
          {/* Name and Title */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">Dr. Jane Doe</h1>
            <p className="text-lg sm:text-xl text-gray-600">Pediatrician</p>
          </div>
          
          {/* Credentials */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Credentials</h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                <span className="font-medium">Degree:</span> MD, Pediatrics
              </li>
              <li>
                <span className="font-medium">Experience:</span> 10 years
              </li>
            </ul>
          </div>
          
          {/* About Section */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">About</h2>
            <p className="text-gray-600">
              Dr. Jane Doe is a highly experienced pediatrician with a passion for providing exceptional care to
              children and their families. With a decade of experience, she has developed a deep understanding of the
              unique needs of young patients and is committed to delivering personalized, compassionate care.
            </p>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Contact</h2>
            <form className="space-y-4">
              <input
                className="flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 w-full"
                placeholder="Name"
                type="text"
              />
              <input
                className="flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 w-full"
                placeholder="Email"
                type="email"
              />
              <textarea
                className="flex min-h-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 w-full"
                placeholder="Message"
              ></textarea>
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 bg-green-500 text-white hover:bg-green-600 h-10 px-4 py-2 w-full"
                type="submit"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDoctor;
