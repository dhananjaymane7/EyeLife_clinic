import React from 'react';
import eye from './assets/eye.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faGlasses, faSyringe } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center bg-white shadow-md">
        <a className="flex items-center justify-center" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-gray-800"
          >
            <path d="M2 12s3-7 10-7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <span className="ml-2 text-lg font-bold text-gray-800">EyeLife Clinic</span>
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-r from-green-500 to-green-400 text-white">
          <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${eye})` }}>
            <div className="bg-black opacity-50 absolute inset-0 z-10"></div>
          </div>
          <div className="container mx-auto px-4 md:px-6 text-center relative z-20">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Comprehensive Eye Care
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-8">
                Experience the best in eye care at our state-of-the-art clinic. Schedule your appointment today.
              </p>
              <a
                href="#"
                className="inline-block bg-white text-green-600 hover:bg-green-700 py-3 px-8 rounded-lg font-medium shadow-lg transition duration-300 ease-in-out"
              >
                Schedule Appointment
              </a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-green-400">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Our Services</h2>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                From routine eye exams to advanced treatments, we offer a wide range of services to meet all your eye care needs.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8">
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <FontAwesomeIcon icon={faEye} className="text-green-600 text-3xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Comprehensive Eye Exams</h3>
                <p className="text-gray-700">
                  Our experienced optometrists provide thorough eye exams to ensure your vision is at its best.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <FontAwesomeIcon icon={faGlasses} className="text-green-600 text-3xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Prescription Eyewear</h3>
                <p className="text-gray-700">
                  Browse our selection of stylish and high-quality frames and lenses to find the perfect fit for your needs.
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <FontAwesomeIcon icon={faSyringe} className="text-green-600 text-3xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Advanced Eye Treatments</h3>
                <p className="text-gray-700">
                  From cataract surgery to LASIK, we offer the latest treatments to improve your vision and eye health.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-r from-blue-200 to-blue-100">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Contact Us</h2>
              <p className="text-lg md:text-xl text-gray-800 mb-8">
                Get in touch with us for all your eye care needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-2">Location</h3>
                  <p className="text-gray-700">EyeLife clinic - Pune, Vimannagar</p>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.902941510758!2d74.57867841417522!3d18.50367767407401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b98206f76fd7%3A0xb02fa7a762c8eac2!2sEyeLife%20Clinic!5e0!3m2!1sen!2sin!4v1622529786161!5m2!1sen!2sin"
                    width="100%"
                    height="200"
                    allowFullScreen=""
                    loading="lazy"
                    title="EyeLife Clinic Location"
                    className="mt-4 rounded-lg"
                  ></iframe>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-2">Phone</h3>
                  <p className="text-gray-700">+91 8485054613</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-2">Email</h3>
                  <p className="text-gray-700">mane.dhananjay.p@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-4">About</h3>
              <a href="#" className="block text-gray-300 hover:text-white mb-2">Our Clinic</a>
              <a href="#" className="block text-gray-300 hover:text-white mb-2">Our Mission</a>
              <a href="#" className="block text-gray-300 hover:text-white mb-2">Careers</a>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Services</h3>
              <a href="#" className="block text-gray-300 hover:text-white mb-2">Eye Exams</a>
              <a href="#" className="block text-gray-300 hover:text-white mb-2">Eyewear</a>
              <a href="#" className="block text-gray-300 hover:text-white mb-2">Eye Treatments</a>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Patients</h3>
              <a href="#" className="block text-gray-300 hover:text-white mb-2">FAQs</a>
              <a href="#" className="block text-gray-300 hover:text-white mb-2">Patient Portal</a>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <a href="#" className="block text-gray-300 hover:text-white mb-2">Phone</a>
              <a href="#" className="block text-gray-300 hover:text-white mb-2">Email</a>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect with</h3>
              <a href="#" className="block text-gray-300 hover:text-white mb-2">
                <input
                  type="text"
                  placeholder="Enter email here"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
