const mongoose = require('mongoose');

require('dotenv').config();

// Removes prepatory warnings for Mongoose 7.
mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

module.exports = mongoose;
