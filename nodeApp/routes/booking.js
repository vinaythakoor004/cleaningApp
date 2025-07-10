const express = require("express");
const {
  getAllBookings,
  createMultipleBookings,
  createBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const router = express.Router();
router.route("/").get(getAllBookings).post(createMultipleBookings).post(createBooking);
router.route("/:id").get(getBookingById).put(updateBooking).delete(deleteBooking);
router.post("/", async (req, res) => {
  const booking = await Booking.create(req.body);
  
  const io = req.app.get("io");
  if (io) {
    io.emit("new-booking", booking);  // 🔥 Real-time emit
  }

  res.status(201).json(booking);
});

module.exports = router;
