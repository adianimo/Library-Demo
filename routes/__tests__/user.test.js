const request = require("supertest");

const app = require("../../app");

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

/************************************** GET /users/books */

describe("GET /users/books", function () {
    test("works", async function () {
        const resp = await request(app)
            .get("/users/books")
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            "books": expect.any(Array),
        });
    });
});