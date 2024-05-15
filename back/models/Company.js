const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String
      // required: true
    },
    email: {
      type: String,
      required: true
      // unique: true
    },
    created: {
      type: String
    },
    updated: {
      type: String
    },
    date: {
      type: String,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', CompanySchema);
