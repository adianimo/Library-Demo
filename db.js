//Postgres database connection configuration
const {Client} = require("pg");
const DB_PASSWORD = require('./Secret')

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = `postgres://rojaviva:${DB_PASSWORD}@localhost:5432/libraryapp_test`;
} else {
  DB_URI = `postgres://rojaviva:${DB_PASSWORD}@localhost:5432/libraryapp`;
}

let db = new Client({
  connectionString: DB_URI,
});

db.connect();

module.exports = db;