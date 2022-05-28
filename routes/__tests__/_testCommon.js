/* Common test helper file used for setup and teardown functionality */
const db = require("../../db");
const { createToken } = require("../../helpers/tokens");

async function commonBeforeAll() {
  //Delete users and reset username uniqueness
  await db.query("DELETE FROM users");
  await db.query('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_pkey CASCADE');
  
  //Delete books and reset book_id sequence
  await db.query("DELETE FROM books");
  await db.query(`ALTER SEQUENCE books_id_seq RESTART WITH 1`);
  
  //Delete authors and reset author_id sequence from author table and books_authors table
  await db.query("DELETE FROM authors");
  await db.query(`ALTER SEQUENCE authors_id_seq RESTART WITH 1`);
  await db.query('ALTER TABLE authors DROP CONSTRAINT IF EXISTS authors_pkey CASCADE');
  
  //Create new users
  await db.query(`INSERT INTO users (username, password, first_name, last_name, email)
          VALUES ('testUser',
                  'password',
                  'test',
                  'user',
                  'testUser@gmail.com'),
                  ('testUser1',
                  'password',
                  'test1',
                  'user1',
                  'testUser1@gmail.com')`);
  
  //Create new books
  await db.query(`INSERT INTO books (title)
          VALUES ('RandomBook'), ('RandomBook1')`);
  
  //Create new authors
  await db.query(`INSERT INTO authors (full_name)
          VALUES ('Test Author'), ('Test Author1')`);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}
//Uncommit changes
async function commonAfterEach() {
  await db.query("ROLLBACK");
}
//Disconnect db
async function commonAfterAll() {
  await db.end();
}

//Create tokens for test users
const u1Token = createToken({ username: "testUser" });
const u2Token = createToken({ username: "testUser1" });



module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
};
