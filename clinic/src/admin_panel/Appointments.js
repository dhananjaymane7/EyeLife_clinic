import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [formState, setFormState] = useState({
    id: null,
    patientName: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    procedure: "",
    date: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("An error occurred while fetching appointments.");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenderFilter = (event) => {
    setGenderFilter(event.target.value);
  };

  const handleStatusFilter = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearchTerm = appointment.patient_name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenderFilter = genderFilter
      ? appointment.gender === genderFilter
      : true;
    const matchesStatusFilter = statusFilter
      ? appointment.status === statusFilter
      : true;
    return matchesSearchTerm && matchesGenderFilter && matchesStatusFilter;
  });

  const handleFormChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddAppointment = async () => {
    try {
      const { patientName, gender, contact, email, address, procedure, date } = formState;
      const response = await axios.post("http://localhost:5000/api/appointments", {
        patientName,
        gender,
        contact,
        email,
        address,
        procedure,
        date,
      });
      setAppointments([...appointments, response.data]);
      setFormState({
        id: null,
        patientName: "",
        gender: "",
        contact: "",
        email: "",
        address: "",
        procedure: "",
        date: "",
        status: "",
      });
    } catch (error) {
      console.error("Error adding appointment:", error);
      alert("An error occurred while adding the appointment.");
    }
  };

  const handleEditAppointment = async () => {
    try {
      const { id, patientName, gender, contact, email, address, procedure, date } = formState;
      await axios.put(`http://localhost:5000/api/appointments/${id}`, {
        patientName,
        gender,
        contact,
        email,
        address,
        procedure,
        date,
      });
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, patient_name: patientName, gender, contact, email, address, procedure1: procedure, date1: date }
          : appointment
      );
      setAppointments(updatedAppointments);
      setIsEditing(false);
      setFormState({
        id: null,
        patientName: "",
        gender: "",
        contact: "",
        email: "",
        address: "",
        procedure: "",
        date: "",
        status: "",
      });
    } catch (error) {
      console.error("Error editing appointment:", error);
      alert("An error occurred while editing the appointment.");
    }
  };

  const handleDeleteAppointment = async (appointment) => {
    try {
      const { patient_name, procedure1, date1 } = appointment;
      await axios.delete('http://localhost:5000/api/appointments', {
        data: { patientName: patient_name, procedure: procedure1, date: date1 }
      });
      const updatedAppointments = appointments.filter(
        (appt) => appt.patient_name !== patient_name || appt.procedure1 !== procedure1 || appt.date1 !== date1
      );
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("An error occurred while deleting the appointment.");
    }
  };
  

  const startEditing = (appointment) => {
    setFormState({
      id: appointment.id,
      patientName: appointment.patient_name,
      gender: appointment.gender,
      contact: appointment.contact,
      email: appointment.email,
      address: appointment.address,
      procedure: appointment.procedure1,
      date: appointment.date1,
      status: appointment.status,
    });
    setIsEditing(true);
  };

  return (
    <div className="appointments-container">
      <h2>Appointments</h2>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by patient name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={genderFilter} onChange={handleGenderFilter}>
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select value={statusFilter} onChange={handleStatusFilter}>
          <option value="">All Statuses</option>
          <option value="com">Completed</option>
          <option value="in_p">In Process</option>
          <option value="can">Cancelled</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Patient Name</th>
            <th>Gender</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Address</th>
            <th>Procedure</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr key={appointment.id}>
              <td>{index + 1}</td>
              <td>{appointment.patient_name || "N/A"}</td>
              <td>{appointment.gender || "N/A"}</td>
              <td>{appointment.contact || "N/A"}</td>
              <td>{appointment.email || "N/A"}</td>
              <td>{appointment.address || "N/A"}</td>
              <td>{appointment.procedure1 || "N/A"}</td>
              <td>
                {appointment.date1
                  ? new Date(appointment.date1).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{appointment.status || "N/A"}</td>
              <td className="actions">
                <button onClick={() => startEditing(appointment)}>Edit</button>
                <button
                  onClick={() => handleDeleteAppointment(appointment.id)}
                  className="delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-container">
        <h3>{isEditing ? "Edit Appointment" : "Add Appointment"}</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isEditing ? handleEditAppointment() : handleAddAppointment();
          }}
        >
          <input
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={formState.patientName}
            onChange={handleFormChange}
          />
          <select
            name="gender"
            value={formState.gender}
            onChange={handleFormChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formState.contact}
            onChange={handleFormChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formState.address}
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="procedure"
            placeholder="Procedure"
            value={formState.procedure}
            onChange={handleFormChange}
          />
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={formState.date}
            onChange={handleFormChange}
          />
          <select
            name="status"
            value={formState.status}
            onChange={handleFormChange}
          >
            <option value="">Select Status</option>
            <option value="com">Completed</option>
            <option value="in_p">In Process</option>
            <option value="can">Cancelled</option>
          </select>
          <button type="submit">
            {isEditing ? "Update Appointment" : "Add Appointment"}
          </button>
        </form>
      </div>
    </div>  
  );
};

export default Appointments;
