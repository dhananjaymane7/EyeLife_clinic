import React, { useState } from 'react';

const Medicine = () => {
  const initialMedicineData = [
    { id: 1, name: 'Aspirin', price: '$10', status: 'Available', inStock: 400, measure: 'tablet' },
    { id: 2, name: 'Paracetamol', price: '$5', status: 'Out of stock', inStock: 0, measure: 'tablet' },
    { id: 3, name: 'Cough Syrup', price: '$7', status: 'Available', inStock: 200, measure: 'ml' },
  ];

  const [medicineData, setMedicineData] = useState(initialMedicineData);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [editedMedicine, setEditedMedicine] = useState({ id: '', name: '', price: '', status: '', inStock: '', measure: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleDelete = (id) => {
    const updatedMedicine = medicineData.filter(medicine => medicine.id !== id);
    setMedicineData(updatedMedicine);
  };

  const handleEditClick = (medicine) => {
    setEditingMedicine(medicine.id);
    setEditedMedicine(medicine);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedMedicine({ ...editedMedicine, [name]: value });
  };

  const handleSave = () => {
    const updatedMedicine = medicineData.map(medicine =>
      medicine.id === editedMedicine.id ? editedMedicine : medicine
    );
    setMedicineData(updatedMedicine);
    setEditingMedicine(null);
  };

  const handleAddMedicine = () => {
    const newMedicine = {
      id: medicineData.length + 1,
      name: '',
      price: '',
      status: 'Available',
      inStock: '',
      measure: ''
    };
    setMedicineData([...medicineData, newMedicine]);
    setEditingMedicine(newMedicine.id);
    setEditedMedicine(newMedicine);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredMedicine = medicineData
    .filter(medicine =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'All' || medicine.status === statusFilter)
    );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4">Medicine</h2>
      <input
        type="text"
        placeholder="Search medicine..."
        className="search-input mb-4 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex mb-4">
        <select
          onChange={handleStatusFilterChange}
          value={statusFilter}
          className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="All">All</option>
          <option value="Available">Available</option>
          <option value="Out of stock">Out of stock</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-200">#</th>
              <th className="py-2 px-4 border-b border-gray-200">Name</th>
              <th className="py-2 px-4 border-b border-gray-200">Price</th>
              <th className="py-2 px-4 border-b border-gray-200">Status</th>
              <th className="py-2 px-4 border-b border-gray-200">In Stock</th>
              <th className="py-2 px-4 border-b border-gray-200">Measure</th>
              <th className="py-2 px-4 border-b border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicine.map((medicine, index) => (
              <tr key={medicine.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-2 px-4 border-b border-gray-200">{index + 1}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {editingMedicine === medicine.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedMedicine.name}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    medicine.name
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {editingMedicine === medicine.id ? (
                    <input
                      type="text"
                      name="price"
                      value={editedMedicine.price}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    medicine.price
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {editingMedicine === medicine.id ? (
                    <select
                      name="status"
                      value={editedMedicine.status}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="Available">Available</option>
                      <option value="Out of stock">Out of stock</option>
                    </select>
                  ) : (
                    <span className={`uppercase font-bold text-sm py-1 px-2 rounded ${medicine.status === 'Available' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{medicine.status}</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {editingMedicine === medicine.id ? (
                    <input
                      type="number"
                      name="inStock"
                      value={editedMedicine.inStock}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  ) : (
                    medicine.inStock
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {editingMedicine === medicine.id ? (
                    <select
                      name="measure"
                      value={editedMedicine.measure}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="tablet">Tablet</option>
                      <option value="capsule">Capsule</option>
                      <option value="mm">mm</option>
                      <option value="cm">cm</option>
                      <option value="gm">gm</option>
                      <option value="ml">ml</option>
                      <option value="label">Label</option>
                    </select>
                  ) : (
                    medicine.measure
                  )}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {editingMedicine === medicine.id ? (
                    <div className="flex">
                      <button onClick={handleSave} className="save-btn bg-blue-500 text-white py-1 px-2 rounded mr-2">Save</button>
                      <button onClick={() => setEditingMedicine(null)} className="cancel-btn bg-gray-500 text-white py-1 px-2 rounded">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex">
                      <button onClick={() => handleEditClick(medicine)} className="edit-btn bg-yellow-500 text-white py-1 px-2 rounded mr-2">Edit</button>
                      <button onClick={() => handleDelete(medicine.id)} className="delete-btn bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleAddMedicine} className="add-medicine-btn bg-green-500 text-white py-2 px-4 rounded mt-4">Add Medicine</button>
    </div>
  );
};

export default Medicine;
