const booking_data = require("../models/booking_data");
const bookingService = require("../services/bookingService");

exports.getAllBookings = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;
  const search = req.query.search?.trim();

  let query = {};

  if (search) {
    const searchRegex = new RegExp("^" + search, "i");
    query = {
      $or: [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { "bookingDetails.serviceName": searchRegex }
      ]
    };
  }

  try {
    const bookings = await booking_data.find(query)
      .skip(skip)
      .limit(pageSize)
      .sort({ "bookingDetails.bookingDateTime": -1 });

    const total = await booking_data.countDocuments(query);

    res.json({ bookings, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMultipleBookings = async (req, res) => {
  try {
    const bookings = await bookingService.createMultipleBookings(req.body);
    res.json({ data: bookings, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.createBooking = async (data) => {
  return await bookingService.createBooking(data);
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    res.json({ data: booking, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await bookingService.updateBooking(req.params.id, req.body);
    res.json({ data: booking, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await bookingService.deleteBooking(req.params.id);
    res.json({ data: booking, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
