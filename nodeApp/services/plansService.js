const plansModel = require("../models/plans");

exports.getAllPlans = async () => {
  return await plansModel.find();
};

exports.createMultiplePlans = async (plans) => {
  return await plansModel.insertMany(plans);
}