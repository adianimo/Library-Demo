const db = require('../db');
const { NotFoundError, BadRequestError } = require('../helpers/ExpressError');
const Api = require('./api');
const Book = require('./books');

class User {
    /* Get a users booklist of all books currently checked-out. */
    static async getBookList(username) {
        /* Verify user exists */
        try {
            const userInfo = await Api.getUserInfo(username);
        } catch (error) {
            return error;
        };
        const bookListRes = await db.query(`SELECT b.id,
                b.title AS "title",
                b.issued_status AS "issued_status",
                b.username_issued AS "username_issued",
                u.username AS "username"
            FROM books b
                   LEFT JOIN users AS u ON u.username = b.username_issued
            WHERE u.username = $1`, [username]);
        const bookListInfo = bookListRes.rows;
        if (bookListInfo) return bookListInfo;
    }
    /* Issue a book to a user */
    static async issueBook(username, book_id) {
        //verify user exists, book exists and book is in stock
        try {
            const userInfo = await Api.getUserInfo(username);
            const bookRes = await Book.getBook(book_id);
            if (!bookRes) {
                throw new NotFoundError(`Invalid book Id : ${book_id} `);
            }
            if (bookRes.issued_status) {
                return { "issued": false };
            }
        }
        catch (error) {
            console.log(error)
            return error;
        }
        // If book is not issued, make query to change issued_status and username_issued
        const issueRes = await db.query(`UPDATE books
                                        SET issued_status = true,
                                            username_issued = $1
                                        WHERE id = $2
                                        RETURNING id,
                                                username_issued,
                                                issued_status,
                                                title`, [username, book_id]);
        const issueInfo = issueRes.rows[0];

        if (issueInfo) {
            return {
                issueResponse: { 'issued': true },
                issueInfo: issueInfo
            }
        };
    };
    /* Return a book */
    static async returnBook(username, book_id) {
        /* Check if book exists, and if book is issued to correct user */
        try {
            const bookRes = await Book.getBook(book_id);
            if (bookRes.username_issued !== username) throw new BadRequestError('You have not issued this book');
        } catch (error) {
            console.log(error)
            return error
        }

        /* Resets username_issued and issued status for book*/
        const bookReturnRes = await db.query(`UPDATE books
                                        SET issued_status = false,
                                            username_issued = null
                                        WHERE id = $1
                                        RETURNING id,
                                                username_issued,
                                                issued_status,
                                                title`, [book_id]);
        const bookReturnInfo = bookReturnRes.rows[0];

        if (bookReturnInfo) return bookReturnInfo;
    }

};

module.exports = User;
