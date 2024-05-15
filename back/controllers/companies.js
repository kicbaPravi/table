const CompanySchema = require('../models/Company.js');
const { createError } = require('../error.js');

exports.getAllCompanies = async (req, res, next) => {
  try {
    const imagesPerPage = 10;
    const pageNumber = parseInt(String(req.query.page), 10) || 0;
    const totalRecords = await CompanySchema.countDocuments();
    const totalPages = Math.ceil(totalRecords / imagesPerPage);

    const allCompanies = await CompanySchema.find()
      .skip(pageNumber ? (pageNumber - 1) * imagesPerPage : 0)
      .limit(imagesPerPage)
      .sort({ _id: -1 });

    if (allCompanies.length > 0) {
      return res.status(200).send({
        companies: allCompanies,
        totalRecords,
        totalPages
      });
    }

    return res.status(200).send([]);
  } catch (err) {
    next(err);
  }
};

exports.addNewCompany = async (req, res, next) => {
  try {
    // Extract company data from request body
    const { name, email, created, updated, date } = req.body;

    // Create a new instance of the CompanySchema
    const newCompany = new CompanySchema({
      name,
      email,
      created,
      updated,
      date
    });

    // Save the new company to the database
    const savedCompany = await newCompany.save();

    // Return the saved company as a response
    res.status(201).json(savedCompany);
  } catch (err) {
    // If an error occurs, pass it to the error handler middleware
    next(err);
  }
};

exports.deleteCompany = async (req, res, next) => {
  const company = await CompanySchema.findById(req.params.id);

  if (!company) {
    return res.status(404).json({ error: 'Company not found' });
  }

  try {
    // Delete the image information from the database
    const deletedImage = await CompanySchema.findByIdAndDelete(req.params.id);

    if (deletedImage) {
      return res.json({ message: 'Company deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Company not found' });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateCompany = async (req, res, next) => {
  try {
    const companyId = req.params.id;

    const existingCompany = await CompanySchema.findById(companyId);

    if (!existingCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const updatedCompany = await CompanySchema.findOneAndUpdate(
      { _id: companyId },
      req.body,
      { new: true }
    );

    return res.status(200).json(updatedCompany);
  } catch (error) {
    next(err);
  }
};
