const express = require("express");
const router = new express.Router();
const {ensureLoggedIn} = require('../middleware/auth');
const User = require("../models/users");

//Require token. Get user's checked-out books
router.get('/books', ensureLoggedIn, async function (req, res, next) {
    try {
        const user = res.locals.user
        const userBookList = await User.getBookList(user.username)
        if (userBookList) return res.json({"books": userBookList.map(book => ({id: book.id, title: book.title}))})
  } catch (error) {
    return next(error)
  }
})

module.exports = router;

