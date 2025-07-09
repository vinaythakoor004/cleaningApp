const fs = require('fs');
const mongoose = require('mongoose');
const Booking = require('../models/booking_data');

const data = JSON.parse(fs.readFileSync('./seed/bookings.json', 'utf-8'));

mongoose.connect('mongodb://mongo:27017/nodejs-booking')
  .then(async () => {
    console.log('✅ Connected to Mongo');
    await Booking.insertMany(data);
    console.log('✅ Data from JSON inserted');
    process.exit();
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
