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

//************************************** GET /books/q=? 

describe("GET /books/q=random", function () {
    test("works", async function () {
        const resp = await request(app)
            .get("/books/?q=random")
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            "Search Results": expect.any(Array),
        });
    });
}); 