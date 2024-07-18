import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faUser, faCalendarAlt, faReceipt, faComments } from "@fortawesome/free-solid-svg-icons";
import './user.css';
import About from './About';
import AboutDoctor from './AboutDoctor';
import AddReview from './AddReview';
import Appointment from './Appointment';
function User() {
  const [activeSection, setActiveSection] = useState(null);

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className='user-dashboard'>
      <div className='left-panel'>
        <FontAwesomeIcon icon={faEye} className="icon" />
        <h2>EyeLife Clinic</h2>
        <h1 className='nav-button' onClick={() => handleButtonClick('aboutUs')}>
          <FontAwesomeIcon icon={faUser} /> About Us
        </h1>
        <h1 className='nav-button' onClick={() => handleButtonClick('aboutDoctor')}>
          <FontAwesomeIcon icon={faUser} /> About Doctor
        </h1>
        <h1 className='nav-button' onClick={() => handleButtonClick('bookAppointment')}>
          <FontAwesomeIcon icon={faCalendarAlt} /> Book An Appointment
        </h1>
        <h1 className='nav-button' onClick={() => handleButtonClick('paymentHistory')}>
          <FontAwesomeIcon icon={faReceipt} /> Payment History
        </h1>
        <h1 className='nav-button' onClick={() => handleButtonClick('addReview')}>
          <FontAwesomeIcon icon={faComments} /> Add Review
        </h1>
      </div>
      <div className='right-panel'>
        {activeSection === 'aboutUs' && <About />}
        {activeSection === 'aboutDoctor' && <AboutDoctor />}
        {activeSection === 'bookAppointment' && <Appointment />}
        {activeSection === 'paymentHistory' && <PaymentHistory />}
        {activeSection === 'addReview' && <AddReview />}
      </div>
    </div>
  );
}
const PaymentHistory = () => (
  <div>
    <h2>Payment History</h2>
    <p>Details of your payment history.</p>
  </div>
);


export default User;
