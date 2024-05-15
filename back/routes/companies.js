const express = require('express');
const {
  getAllCompanies,
  addNewCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/companies');

const router = express.Router();

// Get all companies

router.get('/', getAllCompanies);

// Update company

router.patch('/update/:id', updateCompany);

// Add new company

router.post('/add-new', addNewCompany);

// Delete company

router.delete('/delete/:id', deleteCompany);

module.exports = router;
