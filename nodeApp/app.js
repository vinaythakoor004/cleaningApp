const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nodejs-booking",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((err) => {
  console.error("MongoDB connection error:", err.message);
});

// Routes
const bookingRouter = require("./routes/booking");
app.use("/api/bookings", bookingRouter);

const plansRouter = require("./routes/plans");
app.use("/api/plans", plansRouter);

// Do NOT start server here — server.js will handle it
// ❌ app.listen(3001)

module.exports = app;
