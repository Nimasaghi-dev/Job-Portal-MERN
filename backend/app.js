const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');

const port = process.env.PORT || 9000;

// DB connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('DB connected successfully');
})
.catch((err) => {
    console.log(`DB connection error: ${err}`);
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// Routes
// Add your routes here

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});