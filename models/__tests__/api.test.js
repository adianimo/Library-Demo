const {UnauthorizedError} = require("../../helpers/ExpressError");
const Api = require("../api")
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /api/login */
describe("authenticate", function () {
    const testUser = {
    username: "testUser",
    password: "password",
    };

    test("works", async function () {
        let user = await Api.authenticate(testUser.username, testUser.password);
        expect(user.username).toEqual(testUser.username);
    });

    test("failed authentication - invalid username", async function () {
        try {
            await Api.authenticate('wrongUser', testUser.password);
        } catch (error) {
            expect(error instanceof UnauthorizedError).toBeTruthy();
        }
    });
    test("failed authentication - invalid password", async function () {
        try {
            await Api.authenticate(testUser.username, 'wrong password');
        } catch (error) {
            expect(error instanceof UnauthorizedError).toBeTruthy();
        };
    });

});
