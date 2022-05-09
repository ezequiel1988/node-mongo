const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();
require('./src/db/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


app.use('/', require('./src/routes/greet.route'))
app.use('/api/v1', require('./src/routes/api.route'));
app.use('/api/v1', require('./src/routes/upload.route'));
app.use('/api/v1', require('./src/routes/product.route'));
app.use('/api/v1', require('./src/routes/categories.route'));


app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
