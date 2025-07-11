const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  id: { type: String, required: true },   // e.g. "booking"
  seq: { type: Number, default: 0 }       // the current value
});

module.exports = mongoose.model('Counter', counterSchema);
