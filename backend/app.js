const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

// Rutas
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

module.exports = app;
