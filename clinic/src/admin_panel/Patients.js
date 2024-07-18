import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendarDay,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const Patients = () => {
  const [patientsData, setPatientsData] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);
  const [editedPatient, setEditedPatient] = useState({
    id: "",
    name: "",
    contact: "",
    createdAt: "",
    gender: "",
    bloodGroup: "",
    age: "",
    appointmentStatus: "Completed",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("new");
  const [genderFilter, setGenderFilter] = useState("all");
  const [appointmentFilter, setAppointmentFilter] = useState("all");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    axios
      .get("http://localhost:5000/api/registers")
      .then((response) => {
        setPatientsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching patients:", error);
      });
  };

  const handleDelete = (id) => {
    const updatedPatients = patientsData.filter((patient) => patient.id !== id);
    setPatientsData(updatedPatients);
    // Here you would also make a request to your backend to delete the patient
  };

  const handleEditClick = (patient) => {
    setEditingPatient(patient.id);
    setEditedPatient({
      ...patient,
      createdAt: new Date(patient.createdAt).toISOString().split("T")[0],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient({ ...editedPatient, [name]: value });
  };

  const handleSave = () => {
    const updatedPatients = patientsData.map((patient) =>
      patient.id === editedPatient.id ? editedPatient : patient
    );
    setPatientsData(updatedPatients);
    setEditingPatient(null);
    // Here you would also make a request to your backend to save the edited patient
  };

  const handleAddPatient = () => {
    const newPatient = {
      id: patientsData.length + 1, // This is just a mock id. In a real app, the id should be assigned by the backend.
      name: "",
      contact: "",
      createdAt: new Date().toISOString().split("T")[0],
      gender: "",
      bloodGroup: "",
      age: "",
      appointmentStatus: "Completed",
    };
    setPatientsData([...patientsData, newPatient]);
    setEditingPatient(newPatient.id);
    setEditedPatient(newPatient);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleGenderFilterChange = (e) => {
    setGenderFilter(e.target.value);
  };

  const handleAppointmentFilterChange = (e) => {
    setAppointmentFilter(e.target.value);
  };

  const filteredPatients = patientsData
    .filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (genderFilter === "all" || patient.gender === genderFilter) &&
        (appointmentFilter === "all" ||
          patient.appointmentStatus === appointmentFilter)
    )
    .sort((a, b) => {
      if (sortOrder === "new") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  const today = new Date().toISOString().split("T")[0];
  const todayCount = patientsData.filter(
    (patient) => patient.createdAt === today
  ).length;
  const monthlyCount = patientsData.filter((patient) => {
    const patientMonth = new Date(patient.createdAt).getMonth();
    const currentMonth = new Date().getMonth();
    return patientMonth === currentMonth;
  }).length;
  const yearlyCount = patientsData.filter((patient) => {
    const patientYear = new Date(patient.createdAt).getFullYear();
    const currentYear = new Date().getFullYear();
    return patientYear === currentYear;
  }).length;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Patients</h2>

      <input
        type="text"
        placeholder="Search patients..."
        className="search-input border p-2 rounded mb-4 w-full md:w-1/3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="statistics grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="stat-box flex items-center p-4 rounded shadow w-full md:w-1/2 lg:w-3/4">
          <FontAwesomeIcon
            icon={faUser}
            size="1.5x"
            className="text-green-500 mr-6"
          />
          <p>Today's Patient Count: {todayCount}</p>
        </div>

        <div className="stat-box flex items-center  p-4 rounded shadow w-full md:w-1/2 lg:w-3/4">
          <FontAwesomeIcon
            icon={faCalendarDay}
            size="1.5x"
            className="text-blue-500 mr-6"
          />
          <p>Monthly Patient Count: {monthlyCount}</p>
        </div>
        <div className="stat-box flex items-center  p-4 rounded shadow w-full md:w-1/2 lg:w-3/4">
          <FontAwesomeIcon
            icon={faCalendarAlt}
            size="1.5x"
            className="text-purple-500 mr-6"
          />
          <p>Yearly Patient Count: {yearlyCount}</p>
        </div>
      </div>

      <div className="filters mb-4 flex flex-col md:flex-row gap-4">
        <select
          onChange={handleSortChange}
          value={sortOrder}
          className="p-2 border rounded"
        >
          <option value="new">Sort by New Patients</option>
          <option value="old">Sort by Old Patients</option>
        </select>
        <select
          onChange={handleGenderFilterChange}
          value={genderFilter}
          className="p-2 border rounded"
        >
          <option value="all">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <select
          onChange={handleAppointmentFilterChange}
          value={appointmentFilter}
          className="p-2 border rounded"
        >
          <option value="all">All Appointments</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="patient-table overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Blood Group</th>
              <th className="p-2">Age</th>
              <th className="p-2">Appointments</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr key={patient.id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  {editingPatient === patient.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedPatient.name}
                      onChange={handleInputChange}
                      className="p-2 border rounded w-full"
                    />
                  ) : (
                    patient.name
                  )}
                </td>
                <td className="p-2">
                  {editingPatient === patient.id ? (
                    <input
                      type="number"
                      name="contact"
                      value={editedPatient.contact}
                      onChange={handleInputChange}
                      className="p-2 border rounded w-full"
                    />
                  ) : (
                    patient.contact
                  )}
                </td>
                <td className="p-2">
                  {editingPatient === patient.id ? (
                    <input
                      type="text"
                      name="createdAt"
                      value={editedPatient.createdAt}
                      onChange={handleInputChange}
                      className="p-2 border rounded w-full"
                    />
                  ) : (
                    patient.createdAt
                  )}
                </td>
                <td className="p-2">
                  {editingPatient === patient.id ? (
                    <input
                      type="text"
                      name="gender"
                      value={editedPatient.gender}
                      onChange={handleInputChange}
                      className="p-2 border rounded w-full"
                    />
                  ) : (
                    patient.gender
                  )}
                </td>
                <td className="p-2">
                  {editingPatient === patient.id ? (
                    <input
                      type="text"
                      name="bloodGroup"
                      value={editedPatient.bloodGroup}
                      onChange={handleInputChange}
                      className="p-2 border rounded w-full"
                    />
                  ) : (
                    patient.bloodGroup
                  )}
                </td>
                <td className="p-2">
                  {editingPatient === patient.id ? (
                    <input
                      type="number"
                      name="age"
                      value={editedPatient.age}
                      onChange={handleInputChange}
                      className="p-2 border rounded w-full"
                    />
                  ) : (
                    patient.age
                  )}
                </td>
                <td className="p-2">
                  {editingPatient === patient.id ? (
                    <select
                      name="appointmentStatus"
                      value={editedPatient.appointmentStatus}
                      onChange={handleInputChange}
                      className="p-2 border rounded w-full"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    patient.appointmentStatus
                  )}
                </td>
                <td className="p-2">
                  {editingPatient === patient.id ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="save-btn bg-green-500 text-white p-2 rounded mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPatient(null)}
                        className="cancel-btn bg-red-500 text-white p-2 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(patient)}
                        className="edit-btn bg-blue-500 text-white p-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="delete-btn bg-red-500 text-white p-2 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleAddPatient}
        className="add-patient-btn bg-green-500 text-white p-2 rounded"
      >
        Add Patient
      </button>
    </div>
  );
};

export default Patients;
