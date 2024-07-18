import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Appointment.css';
import axios from 'axios';

function Appointment() {
  const [formData, setFormData] = useState({
    patientName: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
    procedure1: '',
    appointmentDate: new Date() // Default to current date
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      appointmentDate: date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/appointment', formData)
      .then(response => {
        console.log('Appointment booked successfully', response.data);
        axios.post('http://localhost:5000/api/send-email', formData)
          .then(emailResponse => {
            console.log('Email sent successfully', emailResponse.data);
            alert('Appointment booked and email sent successfully');
          })
          .catch(emailError => {
            console.error('Error sending email:', emailError.response ? emailError.response.data : emailError.message);
            alert('Appointment booked, but there was an error sending the email');
          });
      })
      .catch(error => {
        console.error('Error booking appointment:', error.response ? error.response.data : error.message);
        alert('There was an error booking the appointment');
      });
  };

  return (
    <div className='appointment'>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Patient Name:</label>
          <input
            type='text'
            name='patientName'
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Gender:</label>
          <select
            name='gender'
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value=''>Select Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </div>
        <div className='form-group'>
          <label>Contact Number:</label>
          <input
            type='tel'
            name='contactNumber'
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Email Address:</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Address:</label>
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label>Which procedure do you want to make an appointment for?</label>
          <select
            name='procedure1'
            value={formData.procedure1}
            onChange={handleChange}
            required
          >
            <option value=''>Select Procedure</option>
            <option value='medical-examinations'>Medical Examinations</option>
            <option value='doctor-check'>Doctor Check</option>
            <option value='result-analysis'>Result Analysis</option>
            <option value='check-up'>Check-up</option>
          </select>
        </div>
        <div className='form-group'>
          <label>Preferred Appointment Date:</label>
          <DatePicker
            selected={formData.appointmentDate}
            onChange={handleDateChange}
            dateFormat='yyyy/MM/dd'
            className='date-picker'
            required
          />
        </div>
        <div className='form-group'>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Appointment;
