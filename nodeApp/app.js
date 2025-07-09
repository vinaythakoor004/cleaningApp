const express = require("express");
const mongoose = require("mongoose");
const app = express();

//middleware
app.use(express.json());

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

//configure mongoose
mongoose.connect(
  process.env.MONGO_URL || 'mongodb://mongo:27017/nodejs-booking',
  // process.env.MONGODB_URI || "mongodb://localhost/nodejs-booking",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  }).catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

// const blogRouter = require("./app/routes/BlogRoutes");
// app.use("/api/blogs", blogRouter);

const bookingRouter = require("./routes/booking");
app.use("/api/bookings", bookingRouter);

const plansRouter = require("./routes/plans");
app.use("/api/plans", plansRouter);

module.exports = app;
