// routes/companyPartner.js
const express = require('express');
const router = express.Router();
const companyPartnerController = require('../controllers/companyPartner');

router.get('/', companyPartnerController.getAll);
router.get('/:id', companyPartnerController.getById);
router.post('/', companyPartnerController.create);
router.put('/:id', companyPartnerController.update);
router.delete('/:id', companyPartnerController.delete);

module.exports = router;
