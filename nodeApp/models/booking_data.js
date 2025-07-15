const mongoose = require("mongoose");
const Counter = require('./counter'); // import the counter model
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    bookingId: { type: Number, unique: true },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    country: String,
    message: String,
    bookingDetails: {
        serviceName: String,
        bookingDateTime: { type: Date, required: true },
        address: String,
        time: String,
        price: String,
        slot: String
    },
}, { timestamps: true });

// Auto-increment bookingId before saving
bookingSchema.pre('save', async function (next) {
  const doc = this;

  // 🔐 Only assign bookingId if it’s NOT already present
  if (doc.isNew && !doc.bookingId) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: 'booking' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      doc.bookingId = counter.seq;
    } catch (err) {
      return next(err);
    }
  }

  next();
});
module.exports = mongoose.model("booking", bookingSchema);
