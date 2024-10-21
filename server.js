// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/helpdesk_scheduler', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Models
const WorkPosition = mongoose.model('WorkPosition', {
  name: String,
  schedule: [{
    day: Number, // 0-6 (Sunday-Saturday)
    startHour: Number,
    endHour: Number
  }]
});

const Employee = mongoose.model('Employee', {
  name: String,
  shifts: [{
    workPosition: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkPosition' },
    day: Number,
    startHour: Number,
    endHour: Number
  }]
});

// Routes
app.get('/api/work-positions', async (req, res) => {
  const workPositions = await WorkPosition.find();
  res.json(workPositions);
});

app.post('/api/work-positions', async (req, res) => {
  const workPosition = new WorkPosition(req.body);
  await workPosition.save();
  res.json(workPosition);
});

app.get('/api/employees', async (req, res) => {
  const employees = await Employee.find().populate('shifts.workPosition');
  res.json(employees);
});

app.post('/api/employees', async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.json(employee);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});