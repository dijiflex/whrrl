const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const cors = require('cors');
const path = require('path');

// Error Handlers Import
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// Routers.
const usersRouter = require('./routes/userRoutes');

// App Initialization
const app = express();

// 1) ***** GLOBAL MIDDLEWARES ****

// Serving static files.
app.use(express.static('build'));

// Allow cross access resourse sharing
app.use(cors());
app.options('*', cors());

// Set Security HTTP Headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

// Compress response bodies for all request that traverse through the middleware
app.use(compression());

// Development Logging FIXME: Remove in production.
// if (process.env.NODE_ENV === 'development') {
app.use(morgan('dev'));
// }

// Limit requests from client based on IP
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Static files.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 2) ***** API ROUTE MIDDLEWARES ****
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the API',
  });
});
// Handling All Unhandled API Routes
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Sorry, 😢. Can't find ${req.originalUrl} on this server 💥!`,
      404
    )
  );
});

// 3 ) ***** ERROR HANDLING MIDDLEWARES ****
app.use(globalErrorHandler);

module.exports = app;
