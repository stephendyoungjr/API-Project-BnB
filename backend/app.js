// * Imports
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize')

// * Environment
const { environment } = require('./config');
const isProduction = environment === 'production';

// * Setup Middlewares
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json())

// * Security Middleware
  if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

// * Connect Routes
const routes = require('./routes');

app.use(routes); // Connect all the routes

// * Error Handling
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = { message : "The requested resouce couldn't be found."};
    err.status = 404;
    next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
    //check if error is a Sequelize error:
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors;
    }
    next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    if(err.errors) {res.json({
        // title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        // stack: isProduction ? null : err.stack
    })} else {
      res.json({
        // title: err.title || 'Server Error',
        message: err.message,
        // errors: err.errors,
        // stack: isProduction ? null : err.stack
    })
    }
    ;
});


module.exports = app;