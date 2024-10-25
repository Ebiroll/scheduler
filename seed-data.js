const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/helpdesk_scheduler', { useNewUrlParser: true, useUnifiedTopology: true });

// Define schemas
const WorkPositionSchema = new mongoose.Schema({
  name: String,
  schedule: [{
    day: Number, // 0-6 (Sunday-Saturday)
    startHour: Number,
    endHour: Number
  }]
});

const EmployeeSchema = new mongoose.Schema({
  name: String,
  shifts: [{
    workPosition: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkPosition' },
    day: Number,
    startHour: Number,
    endHour: Number,
    confirmed: Number
  }],
  coordinates: [Number]
});

// Create models
const WorkPosition = mongoose.model('WorkPosition', WorkPositionSchema);
const Employee = mongoose.model('Employee', EmployeeSchema);

// Function to create sample data
async function createSampleData() {
  // Clear existing data
  await WorkPosition.deleteMany({});
  await Employee.deleteMany({});

  // Create work positions
  const position1 = await WorkPosition.create({
    name: 'Helpdesk 1',
    schedule: [
      { day: 0, startHour: 0, endHour: 24 }, // Sunday
      { day: 1, startHour: 0, endHour: 24 }, // Monday
      { day: 2, startHour: 0, endHour: 24 }, // Tuesday
      { day: 3, startHour: 0, endHour: 24 }, // Wednesday
      { day: 4, startHour: 0, endHour: 24 }, // Thursday
      { day: 5, startHour: 0, endHour: 24 }, // Friday
      { day: 6, startHour: 0, endHour: 24 }  // Saturday
    ]
  });

  const position2 = await WorkPosition.create({
    name: 'Helpdesk 2',
    schedule: [
      { day: 1, startHour: 9, endHour: 17 }, // Monday
      { day: 2, startHour: 9, endHour: 17 }, // Tuesday
      { day: 3, startHour: 9, endHour: 17 }, // Wednesday
      { day: 4, startHour: 9, endHour: 17 }, // Thursday
      { day: 5, startHour: 9, endHour: 17 }  // Friday
    ]
  });

  const position3 = await WorkPosition.create({
    name: 'Helpdesk 3',
    schedule: [
      { day: 1, startHour: 9, endHour: 12 }, // Monday
      { day: 2, startHour: 9, endHour: 12 }, // Tuesday
      { day: 3, startHour: 9, endHour: 12 }, // Wednesday
      { day: 4, startHour: 0, endHour: 0 }, // Thursday
      { day: 5, startHour: 0, endHour: 0 }  // Friday
    ]
  });

  // Create employees
  await Employee.create({
    name: 'Olof Astrand',
    shifts: [
      { workPosition: position1._id, day: 1, startHour: 8, endHour: 12 , confirmed: 1 },
      { workPosition: position1._id, day: 2, startHour: 9, endHour: 17 , confirmed: 0},
      { workPosition: position1._id, day: 3, startHour: 9, endHour: 17 , confirmed: 1}
    ],
    coordinates: [40.73061, -73.935242]
  });

  await Employee.create({
    name: 'Smaland Jonsson',
    shifts: [
      { workPosition: position2._id, day: 1, startHour: 9, endHour: 17 , confirmed: 1},
      { workPosition: position2._id, day: 2, startHour: 9, endHour: 17 , confirmed: 1},
      { workPosition: position2._id, day: 3, startHour: 9, endHour: 17 , confirmed: 1}
    ],
    coordinates: [40.73061, -73.935242]
  });

  await Employee.create({
    name: 'Nisse Jonsson',
    shifts: [
      { workPosition: position2._id, day: 1, startHour: 9, endHour: 17 , confirmed: 1},
      { workPosition: position2._id, day: 2, startHour: 9, endHour: 17 , confirmed: 1},
      { workPosition: position2._id, day: 3, startHour: 9, endHour: 17 , confirmed: 1},
      { workPosition: position2._id, day: 4, startHour: 9, endHour: 17 , confirmed: 1},
      { workPosition: position2._id, day: 5, startHour: 9, endHour: 17 , confirmed: 1}

    ],
    coordinates: [40.73061, -73.935242]
  });

  console.log('Sample data created successfully');
  mongoose.connection.close();
}

// Run the function
createSampleData().catch(console.error);
