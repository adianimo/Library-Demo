const express = require("express");
const {ensureLoggedIn} = require("../middleware/auth");
const Book = require("../models/books");
const router = new express.Router();

// Search for a book. Case insensitve. Token required. If no query value, return all books.
router.get('/', ensureLoggedIn, async function (req, res, next) {
    const queryTerm = req.query;
    const books = await Book.bookSearch(queryTerm.q);
    return res.json({'Search Results': books});
})
module.exports = router;