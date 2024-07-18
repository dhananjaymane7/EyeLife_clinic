const express = require("express");
const moment = require('moment');
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = 5000;

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "eye_clinic", // Replace with your database name
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    process.exit(1); // Exit the process if database connection fails
  } else {
    console.log("Connected to database");
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to fetch all reviews
app.get("/api/reviews", (req, res) => {
  const query = `
    SELECT patient_name AS patientName, rating, rated_to AS ratedTo, DATE_FORMAT(write_on, '%Y-%m-%d') AS writeOn, comment
    FROM review
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err.stack);
      res
        .status(500)
        .json({ error: "An error occurred while fetching reviews." });
    } else {
      console.log("Fetched reviews successfully.");
      res.status(200).json(results);
    }
  });
});

// Route to insert a new review
app.post("/api/reviews", (req, res) => {
  const { patientName, rating, ratedTo, comment } = req.body;
  const insertQuery = `
    INSERT INTO review (patient_name, rating, rated_to, write_on, comment)
    VALUES (?, ?, ?, ?, ?)
  `;
  const writeOn = new Date().toISOString().slice(0, 10); // Current date without time
  const values = [patientName, rating, ratedTo, writeOn, comment];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting review:", err.stack);
      res.status(500).json({ error: "Failed to insert review." });
    } else {
      console.log("Inserted review successfully.");
      res.status(201).send("Review inserted successfully.");
    }
  });
});

// Route to handle user registration
app.post("/api/register", (req, res) => {
  const { name, contact, email, bloodGroup, age, gender, password } = req.body;

  const insertQuery = `
    INSERT INTO register (name, created_at, contact, email, blood_group, age, gender, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const createdAt = new Date().toISOString().slice(0, 10); // Current date without time
  const values = [
    name,
    createdAt,
    contact,
    email,
    bloodGroup,
    age,
    gender,
    password,
  ];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error registering user:", err.stack);
      res.status(500).json({ error: "Failed to register user." });
    } else {
      console.log("Registered user successfully.");
      res.status(201).json({ message: "User registered successfully." });
    }
  });
});

app.get("/api/registers", (req, res) => {
  const query = `SELECT name, contact, created_at, gender, blood_group, age FROM register`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching registers:", err);
      return res.status(500).json({ error: "An error occurred while fetching registers." });
    }

    if (results.length === 0) {
      console.log("No registers found.");
      return res.status(404).json({ error: "No registers found." });
    }

    const registers = results.map((register, index) => {
      let formattedDate = "Invalid Date";
      if (register.created_at) {
        const date = new Date(register.created_at);
        if (!isNaN(date.getTime())) {
          formattedDate = date.toISOString().split("T")[0];
        }
      }

      return {
        id: index + 1, // Assign a unique ID based on the index
        name: register.name,
        contact: register.contact,
        createdAt: formattedDate, // Format date to YYYY-MM-DD if valid
        gender: register.gender,
        bloodGroup: register.blood_group,
        age: register.age,
        appointmentStatus: "Completed",
      };
    });

    console.log("Fetched registers:", registers);
    return res.status(200).json(registers);
  });
});





app.get("/api/registers/count", (req, res) => {
  const query = `SELECT COUNT(*) AS count FROM register`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching register count:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching register count." });
    }

    const count = results[0].count;
    console.log("Total number of registered patients:", count);
    return res.status(200).json({ count });
  });
});

app.get("/api/appointments/count", (req, res) => {
  const query = `SELECT COUNT(*) AS count FROM appointment`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching appointment count:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching appointment count." });
    }

    const count = results[0].count;
    console.log("Total number of appointments:", count);
    return res.status(200).json({ count });
  });
});



// Route to insert appointment data
app.post("/api/appointment", (req, res) => {
  const { patientName, gender, contactNumber, email, address, procedure1, appointmentDate } = req.body;

  const insertQuery = `INSERT INTO appointment (patient_name, gender, contact, email, address, procedure1, date1) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [patientName, gender, contactNumber, email, address, procedure1, appointmentDate];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error("Error booking appointment:", err.stack);
      res.status(500).json({ error: "Failed to book appointment." });
    } else {
      console.log("Appointment booked successfully.");
      res.status(201).json({ message: "Appointment booked successfully." });
    }
  });
});

// Email sending functionality
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mane.dhananjay.p@gmail.com",
    pass: "umvu douz kbtk spir",
  },
});

app.post("/api/send-email", (req, res) => {
  const {
    patientName,
    gender,
    contactNumber,
    email,
    address,
    procedure,
    appointmentDate,
  } = req.body;

  const mailOptions = {
    from: "mane.dhananjay.p@gmail.com",
    to: email,
    subject: "Appointment Confirmation",
    text: `Dear ${patientName},\n\nThank you for booking an appointment with us. Here are your appointment details:\n\nPatient Name: ${patientName}\nGender: ${gender}\nContact Number: ${contactNumber}\nEmail: ${email}\nAddress: ${address}\nProcedure: ${procedure}\nPreferred Appointment Date: ${new Date(
      appointmentDate
    ).toLocaleDateString()}\n\nBest regards,\nYour Clinic`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.get("/api/appointments", (req, res) => {
  const query = `
    SELECT patient_name, gender, contact, email, address, procedure1, date1 
    FROM appointment
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching appointments:", err.stack);
      res.status(500).json({ error: "An error occurred while fetching appointments." });
    } else {
      const appointments = results.map(appointment => ({
        ...appointment,
        start: moment(appointment.date1).toDate(), // Convert date1 to JavaScript Date object
        end: moment(appointment.date1).toDate(),   // For demo purposes, set end to the same as start
        status: 'in_p'  // Default status for demo purposes
      }));
      console.log("Fetched appointments successfully.");
      res.status(200).json(appointments);
    }
  });
});

app.post("/api/appointments", (req, res) => {
  const { patientName, gender, contact, email, address, procedure, date } = req.body;

  const query = `
    INSERT INTO appointment (patient_name, gender, contact, email, address, procedure1, date1)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [patientName, gender, contact, email, address, procedure, date], (err, results) => {
    if (err) {
      console.error("Error adding appointment:", err.stack);
      res.status(500).json({ error: "An error occurred while adding the appointment." });
    } else {
      res.status(201).json({ id: results.insertId, patientName, gender, contact, email, address, procedure, date });
    }
  });
});

//updating the data
// app.put('/api/appointments', (req, res) => {
//   const { patientName, gender, contact, email, address, procedure, date, oldPatientName, oldProcedure, oldDate } = req.body;

//   const query = `
//     UPDATE appointment
//     SET patient_name = ?, gender = ?, contact = ?, email = ?, address = ?, procedure1 = ?, date1 = ?
//     WHERE patient_name = ? AND procedure1 = ? AND date1 = ?
//   `;

//   db.query(
//     query,
//     [patientName, gender, contact, email, address, procedure, date, oldPatientName, oldProcedure, oldDate],
//     (err, result) => {
//       if (err) {
//         console.error('Error updating appointment:', err.stack);
//         res.status(500).json({ error: 'An error occurred while updating the appointment.' });
//       } else {
//         res.status(200).json({ message: 'Appointment updated successfully.' });
//       }
//     }
//   );
// });

// app.delete('/api/appointments', (req, res) => {
//   const { patientName, procedure, date } = req.body;

//   const query = `
//     DELETE FROM appointment
//     WHERE patient_name = ? AND procedure1 = ? AND date1 = ?
//   `;

//   db.query(query, [patientName, procedure, date], (err, result) => {
//     if (err) {
//       console.error('Error deleting appointment:', err.stack);
//       res.status(500).json({ error: 'An error occurred while deleting the appointment.' });
//     } else {
//       res.status(200).json({ message: 'Appointment deleted successfully.' });
//     }
//   });
// });

app.put('/api/appointments/:patientName/:procedure/:date', (req, res) => {
  const { patientName, gender, contact, email, address, procedure, date, status } = req.body;
  const { patientName: oldPatientName, procedure: oldProcedure, date: oldDate } = req.params;

  const query = `
    UPDATE appointment
    SET patient_name = ?, gender = ?, contact = ?, email = ?, address = ?, procedure1 = ?, date1 = ?, status = ?
    WHERE patient_name = ? AND procedure1 = ? AND date1 = ?
  `;

  db.query(
    query,
    [patientName, gender, contact, email, address, procedure, date, status, oldPatientName, oldProcedure, oldDate],
    (err, result) => {
      if (err) {
        console.error('Error updating appointment:', err.stack);
        res.status(500).json({ error: 'An error occurred while updating the appointment.' });
      } else {
        res.status(200).json({ message: 'Appointment updated successfully.' });
      }
    }
  );
});
app.delete('/api/appointments/:patientName/:procedure/:date', (req, res) => {
  const { patientName, procedure, date } = req.params;

  const query = `
    DELETE FROM appointment
    WHERE patient_name = ? AND procedure1 = ? AND date1 = ?
  `;

  db.query(query, [patientName, procedure, date], (err, result) => {
    if (err) {
      console.error('Error deleting appointment:', err.stack);
      res.status(500).json({ error: 'An error occurred while deleting the appointment.' });
    } else {
      res.status(200).json({ message: 'Appointment deleted successfully.' });
    }
  });
});






// Example of how to start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
