//Database route
const SECRET_KEY = process.env.SECRET_KEY || "secret";

// If using bcrypt for password hashing, speed up bcrypt during tests as the algorithm safety isn't being tested
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 13;

module.exports = {
  SECRET_KEY,
  BCRYPT_WORK_FACTOR
};