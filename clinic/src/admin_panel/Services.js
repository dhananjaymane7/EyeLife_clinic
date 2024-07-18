import React, { useState } from 'react';
import './Services.css';

const Services = () => {
  const initialServicesData = [
    { id: 1, name: 'Eye Exam', createdAt: '2024-06-20', price: '$100', status: 'Enabled' },
    { id: 2, name: 'Laser Surgery', createdAt: '2024-05-15', price: '$500', status: 'Disabled' },
    { id: 3, name: 'Glaucoma Treatment', createdAt: '2024-04-10', price: '$300', status: 'Enabled' },
  ];

  const [servicesData, setServicesData] = useState(initialServicesData);
  const [editingService, setEditingService] = useState(null);
  const [editedService, setEditedService] = useState({ id: '', name: '', createdAt: '', price: '', status: '' });
  const [newService, setNewService] = useState({ name: '', price: '', status: 'Enabled' });
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = (id) => {
    const updatedServices = servicesData.filter(service => service.id !== id);
    setServicesData(updatedServices);
  };

  const handleEditClick = (service) => {
    setEditingService(service.id);
    setEditedService(service);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedService({ ...editedService, [name]: value });
  };

  const handleNewServiceChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleSave = () => {
    const updatedServices = servicesData.map(service =>
      service.id === editedService.id ? editedService : service
    );
    setServicesData(updatedServices);
    setEditingService(null);
  };

  const handleAddNewService = () => {
    const newServiceData = {
      ...newService,
      id: servicesData.length + 1,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setServicesData([...servicesData, newServiceData]);
    setNewService({ name: '', price: '', status: 'Enabled' });
    setIsAdding(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Services</h2>
      <input type="text" placeholder="Search services..." className="search-input mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-200">#</th>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Created At</th>
              <th className="py-2 px-4 border-b border-gray-200">Price</th>
              <th className="py-2 px-4 border-b border-gray-200">Status</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {servicesData.map((service, index) => (
              <tr key={service.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {editingService === service.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedService.name}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    service.name
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {editingService === service.id ? (
                    <input
                      type="text"
                      name="createdAt"
                      value={editedService.createdAt}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    service.createdAt
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {editingService === service.id ? (
                    <input
                      type="text"
                      name="price"
                      value={editedService.price}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    service.price
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {editingService === service.id ? (
                    <select
                      name="status"
                      value={editedService.status}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="Enabled">Enabled</option>
                      <option value="Disabled">Disabled</option>
                    </select>
                  ) : (
                    <span className={`uppercase font-bold text-sm py-1 px-2 rounded ${service.status === 'Enabled' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{service.status}</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {editingService === service.id ? (
                    <>
                      <button onClick={handleSave} className="save-btn mr-2 bg-blue-500 text-white py-1 px-2 rounded">Save</button>
                      <button onClick={() => setEditingService(null)} className="cancel-btn bg-gray-500 text-white py-1 px-2 rounded">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(service)} className="edit-btn bg-yellow-500 text-white py-1 px-2 rounded">Edit</button>
                      <button onClick={() => handleDelete(service.id)} className="delete-btn bg-red-500 text-white py-1 px-2 rounded ml-2">Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAdding ? (
        <div className="new-service-form mt-4 p-4 bg-white border border-gray-200 rounded">
          <h3 className="text-lg font-bold mb-4">Add New Service</h3>
          <input
            type="text"
            name="name"
            placeholder="Service Name"
            value={newService.name}
            onChange={handleNewServiceChange}
            className="input-field mb-2"
          />
          <input
            type="text"
            name="price"
            placeholder="Service Price"
            value={newService.price}
            onChange={handleNewServiceChange}
            className="input-field mb-2"
          />
          <select
            name="status"
            value={newService.status}
            onChange={handleNewServiceChange}
            className="input-field mb-2"
          >
            <option value="Enabled">Enabled</option>
            <option value="Disabled">Disabled</option>
          </select>
          <div className="flex">
            <button onClick={handleAddNewService} className="add-btn bg-green-500 text-white py-1 px-2 rounded mr-2">Add Service</button>
            <button onClick={() => setIsAdding(false)} className="cancel-btn bg-gray-500 text-white py-1 px-2 rounded">Cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsAdding(true)} className="new-service-btn bg-blue-500 text-white py-1 px-4 rounded mt-4">Add New Service</button>
      )}
    </div>
  );
};

export default Services;
