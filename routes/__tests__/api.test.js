
const request = require("supertest");
const app = require("../../app");
const User = require("../../models/users");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /api/login */

describe("POST /api/login", function () {
  test("works", async function () {
    const resp = await request(app)
        .post("/api/login")
        .send({
          username: "testUser",
          password: "password",
        });
    expect(resp.body).toEqual({
      "token": expect.any(String),
    });
  });

  test("unauth with non-existent user", async function () {
    const resp = await request(app)
        .post("/api/login")
        .send({
          username: "no-such-user",
          password: "password1",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth with wrong password", async function () {
    const resp = await request(app)
        .post("/api/login")
        .send({
          username: "testUser",
          password: "nope",
        });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/api/login")
        .send({
          username: "testUser",
        });
    expect(resp.statusCode).toEqual(401); // Error is from validSchema
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
        .post("/api/login")
        .send({
          username: 42,
          password: "above-is-a-number",
        });
    expect(resp.statusCode).toEqual(401);// Error is from validSchema ot UnauthorizedError from Api.authenticate
  });
});

/************************************** POST /api/users/books/issue */

describe("POST /api/users/books/issue", function () {
  test("works", async function () {
    const resp = await request(app)
      .post("/api/users/books/issue")
      .send({
        book_id: 1
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      "issueResponse": expect.any(Object),
      "issueInfo": expect.any(Object)
    });
  });
  
  test("bad request with invalid book id", async function () {
    const resp = await request(app)
        .post("/api/users/books/issue")
        .send({
          book_id: 99,
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);// Error is from BadRequestError from User.issueBook
  });
  
});
/************************************** POST /api/users/books/return */
describe("POST /api/users/books/return", function () {
  test("works", async function () {
    const {book} = User.issueBook('testUser', 1)
    const resp = await request(app)
      .post("/api/users/books/return")
      .send({
        book_id: 1
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual(
     {returned: true}
    );
  });
  test("bad request with invalid book id", async function () {
    const resp = await request(app)
        .post("/api/users/books/return")
        .send({
          book_id: 99,
        })
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400); //Error is from BadRequestError from User.issueBook
  });
});  
  
