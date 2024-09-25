// controllers/companyProfileController.js
const CompanyProfile = require('../models/companyProfile');

// Create or update the company profile (Upsert)
exports.upsertCompanyProfile = async (req, res) => {
  try {
    const filter = {}; // No specific filter, assuming only one profile exists
    const update = req.body;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };

    const companyProfile = await CompanyProfile.findOneAndUpdate(filter, update, options);
    res.status(201).send(companyProfile);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get the company profile
exports.getCompanyProfile = async (req, res) => {
  try {
    const companyProfile = await CompanyProfile.findOne({});
    if (!companyProfile) {
      return res.status(404).send();
    }
    res.status(200).send(companyProfile);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete the company profile
exports.deleteCompanyProfile = async (req, res) => {
  try {
    const companyProfile = await CompanyProfile.deleteOne({});
    if (!companyProfile.deletedCount) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Company profile deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};
