const plansService = require("../services/plansService");

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await plansService.getAllPlans();
    res.json({ data: plans, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMultiplePlans = async (req, res) => {
  try {
    const plans = await plansService.createMultiplePlans(req.body);
    res.json({ data: plans, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}