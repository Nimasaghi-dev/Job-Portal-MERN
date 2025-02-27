const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require("./middleware/error");

const port = process.env.PORT || 9000;

// import routes
const authRoutes = require('./routes/authRoutes');

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
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ 
    limit: '5mb',
    extended: true,
}));
app.use(cookieParser());
app.use(cors());

// Error handler middleware
app.use(errorHandler);

// Routes middleware
// app.get('/', (req , res) => {
//     res.send('Hello from express');
// })
app.use("/api" , authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});