const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    country: String,
    message: String,
    bookingDetails: {
        serviceName: String,
        bookingDateTime: Date,
        address: String,
        time: String,
        price: String,
    },
});

module.exports = mongoose.model("booking", bookingSchema);
