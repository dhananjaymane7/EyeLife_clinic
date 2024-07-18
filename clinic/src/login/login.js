import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import 'tailwindcss/tailwind.css';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(''); // Clear any existing error message
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Login logic here (example provided)
    if (email === 'admin@gmail.com' && password === 'admin123') {
      onLogin('admin');
      navigate('/admin');
    } else if (email === 'user@gmail.com' && password === 'user123') {
      onLogin('user');
      navigate('/user');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          contact,
          email,
          bloodGroup,
          age,
          gender,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registered successfully!');
        navigate('/'); // Redirect to login page or any other page after successful registration
      } else {
        throw new Error(data.error || 'Failed to register user.');
      }
    } catch (err) {
      alert(err.message || 'Failed to register user.');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <FontAwesomeIcon icon={faEye} className="text-green-500 text-3xl mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">EyeLife Clinic</h2>
        </div>

        {isLogin ? (
          <div>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  id="loginEmail"
                  name="loginEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field w-full h-10 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="form-group">
                <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="loginPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field w-full h-10 px-3 py-2 border rounded-md"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">Login</button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button onClick={toggleForm} className="text-green-500 hover:underline">Register</button>
            </p>
          </div>
        ) : (
          <div>
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="form-group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-field w-full h-10 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact No.:</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  className="input-field w-full h-10 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field w-full h-10 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">Blood Group:</label>
                <select
                  id="bloodGroup"
                  name="bloodGroup"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  required
                  className="input-field w-full h-10 px-3 py-2 border rounded-md"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  className="input-field w-full h-10 px-3 py-2 border rounded-md"
                />
              </div>

              <div className="form-group">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender:</label>
                <select
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="input-field w-full h-10 px-3 py-2 border rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field w-full h-10 px-3 py-2 border rounded-md"
                />
              </div>

              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">Register</button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button onClick={toggleForm} className="text-green-500 hover:underline">Login</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
