const express = require("express");
const {ensureLoggedIn} = require("../middleware/auth");
const router = new express.Router();
const Author = require('../models/authors');

//search for a author. case insensitve. Token required. If no query value, returns all author
router.get('/', ensureLoggedIn, async function (req, res, next) {
    const queryTerm = req.query;
    const authors = await Author.find(queryTerm.q);
    return res.json({'Search Results': authors});
})
module.exports = router;