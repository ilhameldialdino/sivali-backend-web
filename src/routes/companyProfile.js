// routes/companyProfileRoutes.js
const express = require('express');
const router = express.Router();
const companyProfileController = require('../controllers/companyProfile');

// Create or update the company profile (Upsert)
router.post('/company-profile', companyProfileController.upsertCompanyProfile);

// Get the company profile
router.get('/company-profile', companyProfileController.getCompanyProfile);

// Delete the company profile
router.delete('/company-profile', companyProfileController.deleteCompanyProfile);

module.exports = router;
