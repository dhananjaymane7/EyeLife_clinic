import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi'; // Assuming you have installed react-icons library

const EyeIcon = (props) => (
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
    className={`w-12 h-12 ${props.className}`}
  >
    <path d="M2 12s3-7 10-7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const GlassesIcon = (props) => (
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
    className={`w-12 h-12 ${props.className}`}
  >
    <circle cx="6" cy="15" r="4" />
    <circle cx="18" cy="15" r="4" />
    <path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
    <path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2" />
    <path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2" />
  </svg>
);

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <header className="flex justify-end items-center h-16 px-4 md:px-8 bg-green-500 text-white">
        <Link to="/login" className="ml-auto">
          <FiUser className="text-xl" />
        </Link>
      </header>
      <section className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-r from-[#e6f0ff] to-[#f0f8ff]">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-green-800">
            Welcome to EyeLife
          </h1>
          <p className="max-w-[700px] text-green-700 md:text-xl">
            EyeLife is a premier eye care clinic dedicated to providing exceptional vision services and personalized
            care for our patients. Our team of experienced ophthalmologists and optometrists are committed to helping
            you achieve optimal eye health and clear, comfortable vision.
          </p>
          <Link
            to="/learn-more"
            className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 motion-safe:hover:scale-105"
          >
            Learn More
          </Link>
        </div>
      </section>
      <section className="w-full py-12 md:py-20 lg:py-28">
        <div className="container px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center space-y-4">
            <EyeIcon className="text-green-600" />
            <h3 className="text-xl font-bold text-green-800">Comprehensive Eye Exams</h3>
            <p className="text-green-700 text-center">
              Our comprehensive eye exams use the latest technology to thoroughly assess your vision and eye health.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <GlassesIcon className="text-green-600" />
            <h3 className="text-xl font-bold text-green-800">Eyewear Solutions</h3>
            <p className="text-green-700 text-center">
              We offer a wide selection of stylish and high-quality prescription glasses, contact lenses, and
              sunglasses.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <EyeIcon className="text-green-600" />
            <h3 className="text-xl font-bold text-green-800">Advanced Eye Care</h3>
            <p className="text-green-700 text-center">
              Our team of specialists provides cutting-edge treatments for a variety of eye conditions and diseases.
            </p>
          </div>
        </div>
      </section>
      <footer className="py-4 px-4 md:px-8 bg-green-500 text-white text-center">
        &copy; {new Date().getFullYear()} EyeLife. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
