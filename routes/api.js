const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const ApiLoginSchema = require('../schemas/ApiLogin.json')
const ApiBookActionSchema = require('../schemas/ApiBookAction.json')
const {SECRET_KEY} = require('../config')
const ExpressError = require('../helpers/ExpressError');
const {ensureLoggedIn} = require("../middleware/auth");
const User = require("../models/users");
const Api = require("../models/api");
const validSchema = require("../helpers/validSchema");


// validate data, authenticate user, and provide jwt
router.post("/login", async function (req, res, next) {
  try {
    validSchema(req.body, ApiLoginSchema);;
    const { username, password } = req.body;
    let user = await Api.authenticate(username, password);;
    
    if (user) {
        let token = jwt.sign({ username }, SECRET_KEY);
        return res.json({ token });
    }
    throw new ExpressError("Invalid user/password", 400);
  } catch (err) {
    return next(err);
  }
});

//require token to extract username, validate data, issue a book
router.post('/users/books/issue',ensureLoggedIn, async function (req, res, next) {
  try {
    validSchema(req.body, ApiBookActionSchema);
    const user = res.locals.user;
    const {book_id} = req.body;
    const issueRes = await User.issueBook(user.username, book_id);
    if (issueRes instanceof Error) throw issueRes;
    return res.json(issueRes);
  } catch (error) {
    return next(error);
  }
});
//require token to extract username, validate data and return a book
router.post('/users/books/return', ensureLoggedIn, async function (req, res, next) {
  try {
    validSchema(req.body, ApiBookActionSchema);
    const user = res.locals.user;
    const {book_id} = req.body;
    const bookReturnInfo = await User.returnBook(user.username, book_id);
     if (bookReturnInfo instanceof Error) throw bookReturnInfo;
    return res.json({'returned': !bookReturnInfo.issued_status});
  }
  catch (error) {
    return next(error);
  }
})
module.exports = router;