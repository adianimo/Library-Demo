/** Auth JWT token, add auth'd user (if any) to req. */
const {UnauthorizedError} = require('../helpers/ExpressError');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config');

/* Authenticates JWT and defines response local user */
function authenticateJWT(req, res, next) {
  try {
      const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
        const token = authHeader.replace(/^[Bb]earer /, "").trim();
        res.locals.user = jwt.verify(token, SECRET_KEY);
        }
      return next();
  } catch (err) {
    return next();
  } 
}
/* Confirms response local user exists, otherwise throw UnathorizedError */
function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT: authenticateJWT,
  ensureLoggedIn: ensureLoggedIn
};