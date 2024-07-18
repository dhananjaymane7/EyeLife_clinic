import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profileData, setProfileData] = useState({
    email: 'example@example.com',
    phone: '(123) 456-7890',
  });
  const [formData, setFormData] = useState({
    title: 'Mr',
    fullName: '',
    phone: '',
    email: '',
  });

  const navigate = useNavigate();

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    setProfileData({
      email: formData.email,
      phone: formData.phone,
    });
    // Show a success message or perform other actions as needed
    console.log('Profile photo:', profilePhoto);
    console.log('Form data:', formData);
  };

  const handleDeleteAccount = () => {
    setProfilePhoto(null);
    setProfileData({
      email: '',
      phone: '',
    });
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="settings-left mb-6 md:mb-0 md:w-1/3">
          <h3 className="text-2xl font-semibold mb-4">Profile</h3>
          {profilePhoto ? (
            <img src={profilePhoto} alt="Profile" className="rounded-full w-32 h-32 object-cover mx-auto mb-4" />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">No Image</div>
          )}
          <p className="text-center">{profileData.email}</p>
          <p className="text-center">{profileData.phone}</p>
        </div>
        <div className="settings-right md:w-2/3">
          <h3 className="text-2xl font-semibold mb-4">Update Profile</h3>
          <div className="mb-4">
            <input
              type="file"
              id="profilePhoto"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <label
              htmlFor="profilePhoto"
              className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
            >
              Drag your image here or click to upload (300x300)
            </label>
          </div>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-gray-700">Title</span>
            <select
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="Mr">Mr</option>
              <option value="Dr">Dr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
            </select>
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-gray-700">Full Name</span>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-gray-700">Phone Number</span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-gray-700">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </label>
          <div className="flex space-x-4">
            <button
              className="delete-btn bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
            <button
              className="save-btn bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
