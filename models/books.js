const db = require('../db');
const { BadRequestError } = require('../helpers/ExpressError');

class Book {
    static async bookSearch(title) {

        let query = `SELECT id,
                            title
                    FROM books`;
        let whereExpressions = [];
        let queryValues = [];

        // If no title is passed in, list of all books wil be returned
        if (title !== undefined) {
            queryValues.push(`%${title}%`);
            whereExpressions.push(`title ILIKE $${queryValues.length}`);
        }

        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }
        // Finalize query and return results
        query += " ORDER BY title";
        const booksRes = await db.query(query, queryValues);
        return booksRes.rows;
    }
    /* Find a book by id. Returns book info */
    static async getBook(book_id) {
        const bookRes = await db.query(`SELECT id,
                title,
                issued_status,
                username_issued
                FROM books
                WHERE id = $1`,
            [book_id]);
        const bookInfo = bookRes.rows[0];
        if (!bookInfo) throw new BadRequestError('Book Id not found')
        return bookInfo
    }
}

module.exports = Book;