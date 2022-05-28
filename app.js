const express = require('express')
const apiRoutes = require('./routes/api');
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const authorRoutes = require('./routes/author')
const { ExpressError, NotFoundError } = require("./helpers/ExpressError");
const { authenticateJWT } = require("./middleware/auth");

const app = express();

//middleware
app.use(express.json());
app.use(authenticateJWT);

//routes
app.use('/api', apiRoutes);
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

/** Handle 404 errors */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;