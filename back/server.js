const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const companiesRoutes = require('./routes/companies.js');
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO).then(() => {
      console.log('CONNECTED DO MONGODB');
    });
  } catch (error) {
    throw error;
  }
};

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use('/auth/', authRoutes);
app.use('/companies/', companiesRoutes);

app.listen(5001, () => {
  connect();
});
