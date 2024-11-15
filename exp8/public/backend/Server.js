const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/student_db')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define Student schema
const StudentSchema = new mongoose.Schema({
  name: String,
  rollno: Number,
  age: Number,
  email: String,
});

const Student = mongoose.model('Student', StudentSchema);

// CRUD routes

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving students' });
  }
});

// Add a new student
app.post('/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json(newStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error adding student' });
  }
});

// Update a student by ID
app.put('/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating student' });
  }
});

// Delete a student by ID
app.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting student' });
  }
});

// Search for a student by rollno
app.get('/students/search/:rollno', async (req, res) => {
  try {
    const student = await Student.findOne({ rollno: req.params.rollno });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error searching for student' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));