const BookingModel = require("../models/booking_data");

exports.getAllBookings = async () => {
  return await BookingModel.find();
};

exports.createMultipleBookings = async (bookings) => {
  return await BookingModel.insertMany(bookings);
}

exports.createBooking = async (data) => {
  const booking = await BookingModel.create(data);
  return booking;
};

exports.getBookingById = async (id) => {
  return await BookingModel.findById(id);
};

exports.updateBooking = async (id, booking) => {
  return await BookingModel.findByIdAndUpdate(id, booking);
};

exports.deleteBooking = async (id) => {
  return await BookingModel.findByIdAndDelete(id);
};
