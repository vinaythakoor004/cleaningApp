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

router.route("/")
  .get(getAllBookings)
  .post(async (req, res) => {
    try {
      const booking = await createBooking(req.body); // we’ll update this
      const io = req.app.get("io");
      if (io) io.emit("new-booking", booking);
      res.status(201).json({ data: booking, status: "success" });
    } catch (err) {
      console.error("Booking creation failed:", err.message);
      res.status(500).json({ error: err.message });
    }
  });

router.route("/:id")
  .get(getBookingById)
  .put(updateBooking)
  .delete(deleteBooking);

module.exports = router;
