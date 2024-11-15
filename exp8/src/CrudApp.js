import React, { useState } from 'react';
import axios from 'axios';
import './CrudApp.css';

function CrudApp() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', rollno: '', age: '', email: '' });
  const [editing, setEditing] = useState(null);
  const [editingStudent, setEditingStudent] = useState({});
  const [searchRollno, setSearchRollno] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/students');
      const sortedStudents = response.data.sort((a, b) => a.name.localeCompare(b.name));
      setStudents(sortedStudents);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Failed to fetch students');
    }
  };

  const addStudent = async () => {
    if (newStudent.name && newStudent.rollno && newStudent.age && newStudent.email) {
      try {
        const response = await axios.post('http://localhost:5000/students', newStudent);
        setStudents([...students, response.data].sort((a, b) => a.name.localeCompare(b.name)));
        setNewStudent({ name: '', rollno: '', age: '', email: '' });
      } catch (err) {
        setError('Failed to add student');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      setStudents(students.filter(student => student._id !== id));
    } catch (err) {
      setError('Failed to delete student');
    }
  };

  const updateStudent = async (id) => {
    if (editingStudent.name && editingStudent.rollno && editingStudent.age && editingStudent.email) {
      try {
        const response = await axios.put(`http://localhost:5000/students/${id}`, editingStudent);
        setStudents(students.map(student => (student._id === id ? response.data : student)).sort((a, b) => a.name.localeCompare(b.name)));
        setEditing(null);
        setEditingStudent({});
      } catch (err) {
        setError('Failed to update student');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  const searchByRollno = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/students/search/${searchRollno}`);
      setSearchResult(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setSearchResult(null);
      setError('Student not found');
    }
  };

  return (
    <div className="container">
      <h1>Student Database CRUD</h1>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Add New Student */}
      <div className="form-group">
        <h2>Add Student</h2>
        <input
          type="text"
          placeholder="Name" className='input'
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Roll No"
          value={newStudent.rollno} className='input'
          onChange={(e) => setNewStudent({ ...newStudent, rollno: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newStudent.age} className='input'
          onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email} className='input'
          onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
        />
        <div className="form-buttons">
          <button className="btn" onClick={addStudent}>Add Student</button>
        </div>
      </div>

      {/* Search Student by Rollno */}
      <div className="form-group" >
        <h2 >Search by Roll No</h2>
        <input
          type="number"
          placeholder="Enter Roll No" className='input'
          value={searchRollno}
          onChange={(e) => setSearchRollno(e.target.value)}
        />
        <button className="btn" onClick={searchByRollno}>Search</button>
        {loading && <p>Loading...</p>}
        {searchResult && (
          <div className="card">
            <h3>Search Result:</h3>
            <p><strong>Name:</strong> {searchResult.name}</p>
            <p><strong>Roll No:</strong> {searchResult.rollno}</p>
            <p><strong>Age:</strong> {searchResult.age}</p>
            <p><strong>Email:</strong> {searchResult.email}</p>
          </div>
        )}
      </div>

      <button className="btn" onClick={fetchStudents}>See all students</button>

      {/* List of Students */}
      <ul>
        {students.map(student => (
          <li key={student._id}>
            <div className="card">
              <div className="card-content">
                {editing === student._id ? (
                  <div>
                    <input
                      type="text"
                      value={editingStudent.name}
                      onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                      placeholder="Edit Name"
                    />
                    <input
                      type="number"
                      value={editingStudent.rollno}
                      onChange={(e) => setEditingStudent({ ...editingStudent, rollno: e.target.value })}
                      placeholder="Edit Roll No"
                    />
                    <input
                      type="number"
                      value={editingStudent.age}
                      onChange={(e) => setEditingStudent({ ...editingStudent, age: e.target.value })}
                      placeholder="Edit Age"
                    />
                    <input
                      type="email"
                      value={editingStudent.email}
                      onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                      placeholder="Edit Email"
                    />
                    <div className="form-buttons">
                      <button onClick={() => updateStudent(student._id)}>Save</button>
                      <button onClick={() => setEditing(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>{student.name}</p>
                    <p>Roll No: {student.rollno}</p>
                    <p>Age: {student.age}</p>
                    <p>Email: {student.email}</p>
                  </div>
                )}
              </div>
              <div className="card-actions">
                <button onClick={() => { setEditing(student._id); setEditingStudent(student); }}>Edit</button>
                <button onClick={() => deleteStudent(student._id)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrudApp;
