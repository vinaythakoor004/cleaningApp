const express = require("express");
const {
  getAllPlans,
  createMultiplePlans,
} = require("../controllers/plansController");

const router = express.Router();
router.route("/").get(getAllPlans).post(createMultiplePlans);

module.exports = router;
