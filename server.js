const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/helpdesk_scheduler', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

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
  }],
  coordinates: [Number]
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

// New route to get a specific employee's schedule
app.get('/api/employees/:id/schedule', async (req, res) => {
  const employee = await Employee.findById(req.params.id).populate('shifts.workPosition');
  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }
  res.json(employee.shifts);
});

// New route to get work position details by ID
app.get('/api/work-positions/:id', async (req, res) => {
  const workPosition = await WorkPosition.findById(req.params.id);
  if (!workPosition) {
    return res.status(404).json({ message: 'Work position not found' });
  }
  res.json(workPosition);
});

// New route to get the schedule
app.get('/api/schedule', async (req, res) => {
  const schedule = await WorkPosition.find({}, 'name schedule');
  res.json(schedule);
});

// New route to get employee coordinates
app.get('/api/employee-coordinates', async (req, res) => {
  const employees = await Employee.find({}, 'name coordinates');
  res.json(employees);
});

// Serve the map.html file for the /map route
app.get('/map', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'map.html'));
});

// Catch-all route to serve the index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
