// controllers/companyPartnerController.js
const CompanyPartner = require('../models/companyPartner'); 

exports.getAll = async (req, res) => {
  try {
    const companies = await CompanyPartner.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const company = await CompanyPartner.findById(req.params.id);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const newCompany = new CompanyPartner(req.body);
    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedCompany = await CompanyPartner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedCompany) {
      res.json(updatedCompany);
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedCompany = await CompanyPartner.findByIdAndDelete(req.params.id);
    if (deletedCompany) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
