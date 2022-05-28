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

//************************************** GET /authors/q=? 

describe("GET /authors/q", function () {
    test("works", async function () {
        const resp = await request(app)
            .get("/books/?q=test")
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            "Search Results": expect.any(Array),
        });
    });
}); 