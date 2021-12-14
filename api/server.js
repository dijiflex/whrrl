/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//reading .env fle to nodeprocess
dotenv.config({ path: './keys.env' });

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err, err.name, err.message);
  process.exit(1);
});

//Call the main App
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3080;
const server = app.listen(port, () => {
  console.info(
    `App running on port ${port}, on ${process.env.NODE_ENV} environment`
  );
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
