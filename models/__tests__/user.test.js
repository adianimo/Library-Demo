//tests for booklist, issue and return book
const {UnauthorizedError} = require("../../helpers/ExpressError");
const User = require("../users")
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

/************************************** test getBookList */
describe("get user's books", function () {
    const testUser = {
    username: "testUser",
    password: "password",
    };
    //Issue a book to testUser
    test("works", async function () {
        const {issueInfo} = await User.issueBook(testUser.username, 1);
        let booklist = await User.getBookList(testUser.username);
        expect(booklist[0]).toEqual(expect.objectContaining(issueInfo));
    });
    test("failed- invalid username", async function () {
        try {
            await User.getBookList('wrongUser')
        } catch (error) {
            expect(error instanceof UnauthorizedError).toBeTruthy();
        };
    });
});
/************************************** test issue book */
describe("issue book", function () {
    const testUser = {
        username: "testUser",
        password: "password",
    };
    test("works", async function () {
        const {issueInfo} = await User.issueBook(testUser.username, 1);
        expect(issueInfo).toEqual(expect.objectContaining({username_issued: testUser.username}));
    });
});
/************************************** test return book */
describe("return book", function () {
    const testUser = {
        username: "testUser",
        password: "password",
    };
    test("works", async function () {
        const {issueInfo} = await User.issueBook(testUser.username, 1);
        const bookReturnInfo = await User.returnBook(testUser.username, 1);
        expect(bookReturnInfo).toEqual(expect.objectContaining({issued_status: false}));
    });
});

