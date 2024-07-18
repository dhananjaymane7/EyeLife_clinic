import React, { useState, useEffect } from "react";
import axios from "axios";
import Services from "./Services";
import Patients from "./Patients";
import Reviews from "./Review";
import Medicine from "./Medicine";
import Appointments from "./Appointments";
import Settings from "./Settings";
import Payments from "./Payment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import eye from "./assets/eye.jpg";
import {
  faEye,
  faUser,
  faCalendarAlt,
  faReceipt,
  faComments,
  faStethoscope,
  faPills,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./admin.css";

// Register all necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Admin() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0); // State for total earnings

  useEffect(() => {
    fetchTotalPatients();
    fetchTotalAppointments();
    fetchTotalEarnings(); // Fetch total earnings on component mount
  }, []);

  const fetchTotalPatients = () => {
    axios.get('http://localhost:5000/api/registers/count')
      .then(response => {
        setTotalPatients(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching total patients:', error);
      });
  };

  const fetchTotalAppointments = () => {
    axios.get('http://localhost:5000/api/appointments/count')
      .then(response => {
        setTotalAppointments(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching total appointments:', error);
      });
  };

  const fetchTotalEarnings = () => {
    axios.get('http://localhost:5000/api/payments/earnings')
      .then(response => {
        setTotalEarnings(response.data.totalEarnings);
      })
      .catch(error => {
        console.error('Error fetching total earnings:', error);
      });
  };

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Total Patients",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const barData1 = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Total Earnings in thousands",
        data: [3, 9, 4, 8, 2, 6],
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Appointments", "Completed", "Cancelled"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="user-dashboard">
      <div className="left-panel">
        <FontAwesomeIcon icon={faEye} className="icon" />
        <h2>EyeLife Clinic</h2>
        <h1 className="nav-button" onClick={() => handleButtonClick("dashboard")}>
          <FontAwesomeIcon icon={faUser} /> Dashboard
        </h1>
        <h1 className="nav-button" onClick={() => handleButtonClick("patients")}>
          <FontAwesomeIcon icon={faStethoscope} /> Patients
        </h1>
        <h1 className="nav-button" onClick={() => handleButtonClick("appointments")}>
          <FontAwesomeIcon icon={faCalendarAlt} /> Appointments
        </h1>
        <h1 className="nav-button" onClick={() => handleButtonClick("payments")}>
          <FontAwesomeIcon icon={faReceipt} /> Payments
        </h1>
        <h1 className="nav-button" onClick={() => handleButtonClick("services")}>
          <FontAwesomeIcon icon={faComments} /> Services
        </h1>
        <h1 className="nav-button" onClick={() => handleButtonClick("medicine")}>
          <FontAwesomeIcon icon={faPills} /> Medicine
        </h1>
        <h1 className="nav-button" onClick={() => handleButtonClick("reviews")}>
          <FontAwesomeIcon icon={faComments} /> Reviews
        </h1>
        <h1 className="nav-button" onClick={() => handleButtonClick("settings")}>
          <FontAwesomeIcon icon={faCog} /> Settings
        </h1>
      </div>
      <div className="right-panel">
        {activeSection === "dashboard" && <Dashboard totalAppointments={totalAppointments} totalPatients={totalPatients} totalEarnings={totalEarnings} />}
        {activeSection === "patients" && <Patients />}
        {activeSection === "appointments" && <Appointments />}
        {activeSection === "payments" && <Payments />}
        {activeSection === "services" && <Services />}
        {activeSection === "medicine" && <Medicine />}
        {activeSection === "reviews" && <Reviews />}
        {activeSection === "settings" && <Settings />}
      </div>
    </div>
  );
}

const Dashboard = ({ totalAppointments, totalPatients, totalEarnings }) => {
  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Total Patients",
        data: [65, 59, 80, 81, 56],
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const barData1 = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Total Earnings in thousands",
        data: [3, 9, 4, 8, 2, 6],
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const pieData = {
    labels: ["Appointments", "Completed", "Cancelled"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="dashboard-boxes">
        <div className="box1 patients">
          <h4>
            <FontAwesomeIcon icon={faUser} /> Total Patients: {totalPatients}
          </h4>
          <div className="chart-container">
            <Bar data={barData} />
          </div>
        </div>
        <div className="box1 appointments">
          <h4>
            <FontAwesomeIcon icon={faCalendarAlt} /> Total Appointments: {totalAppointments}
          </h4>
          <div className="chart-container">
            <Pie data={pieData} />
          </div>
        </div>
        <div className="box1 earnings">
          <h4>
            <FontAwesomeIcon icon={faReceipt} /> Total Earnings: ${totalEarnings}
          </h4>
          <div className="chart-container">
            <Bar data={barData1} />
          </div>
        </div>
      </div>

      <div className="dashboard-about">
  <div className="text-content">
    <h3>The Future Of Eye Care Is Here</h3>
    <p>
      Discover the latest advancements in eye care technology and treatment
      options that are revolutionizing the industry. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
      dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
      nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
      culpa qui officia deserunt mollit anim id est laborum.
    </p>
    <p>
      Our team of dedicated professionals is committed to providing you with
      personalized care and state-of-the-art treatments. Whether you're seeking
      routine eye exams or advanced surgical procedures, we are here to meet
      your needs and exceed your expectations.
    </p>
    <button>Read More</button>
  </div>
  <img src={eye} alt="Eye Care" className="about-image" />
</div>

    </div>
  );
};

export default Admin;
