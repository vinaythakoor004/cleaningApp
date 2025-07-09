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

module.exports = router;
