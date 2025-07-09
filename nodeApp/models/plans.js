const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    name: String,
    price: String,
    period: String,
});

module.exports = mongoose.model("plans", bookingSchema);
