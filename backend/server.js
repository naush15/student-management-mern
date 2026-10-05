const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Student = require("./models/Student");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Student Management API is running");
});

// GET all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching students"
    });
  }
});

// POST student
app.post("/api/students", async (req, res) => {
  try {
    const student = new Student({
      name: req.body.name,
      email: req.body.email,
      course: req.body.course
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({
      message: "Error creating student"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});