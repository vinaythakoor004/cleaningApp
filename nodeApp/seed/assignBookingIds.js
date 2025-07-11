const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Counter = require("../models/counter");

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/nodejs-booking";

async function assignBookingIds() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");

    // Get the counter for booking, or initialize it
    let counter = await Counter.findOne({ id: "booking" });
    if (!counter) {
      counter = await Counter.create({ id: "booking", seq: 0 });
    }

    // Get all bookings that don't have bookingId
    const bookings = await Booking.find({ bookingId: { $exists: false } }).sort({ createdAt: 1 });

    for (const booking of bookings) {
      counter.seq += 1;
      booking.bookingId = counter.seq;
      await booking.save();
      console.log(`Updated booking ${booking._id} with bookingId ${booking.bookingId}`);
    }

    // Save the updated counter
    await counter.save();

    console.log("✅ All bookingIds assigned successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error assigning bookingIds:", err);
    process.exit(1);
  }
}

assignBookingIds();
