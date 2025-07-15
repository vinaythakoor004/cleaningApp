const mongoose = require('mongoose');
const fs = require('fs');
const Booking = require('../models/booking_data');

const MONGO_URL = 'mongodb://mongo:27017/nodejs-booking';

async function seed() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false
    });
    console.log('✅ Connected to local MongoDB');

    // const data = JSON.parse(fs.readFileSync('/app/seed/bookings.json', 'utf-8'));
    const data = JSON.parse(fs.readFileSync('/app/seed/bookings.json', 'utf-8'));

    await Booking.deleteMany({});
    console.log('🧹 Cleared existing bookings');

    let successCount = 0;
    let failureCount = 0;

    for (const item of data) {
      try {
        const booking = new Booking(item);
        await booking.save();
        console.log(`✅ Saved: bookingId ${item.bookingId}`);
        successCount++;
      } catch (err) {
        console.error(`❌ Failed: bookingId ${item.bookingId} → ${err.message}`);
        failureCount++;
      }
    }

    // Check if collection was created
    const collections = await mongoose.connection.db.listCollections().toArray();
    const hasBookings = collections.some(c => c.name === 'bookings');

    console.log(`\n📦 Final Results:`);
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Failures: ${failureCount}`);
    console.log(hasBookings
      ? '📂 ✅ bookings collection exists in DB'
      : '📂 ❌ bookings collection was NOT created (no successful insert)'
    );

    process.exit();
  } catch (err) {
    console.error('❌ Seed script failed:', err.message);
    process.exit(1);
  }
}

seed();
