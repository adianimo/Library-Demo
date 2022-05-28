const db = require('../db');
class Author {
    /* Search for an author. Case insensitve. */
    static async find(name) {
        let query = `SELECT id,
                            full_name
                    FROM authors`;
        let whereExpressions = [];
        let queryValues = [];

        if (name !== undefined) {
            queryValues.push(`%${name}%`);
            whereExpressions.push(`full_name ILIKE $${queryValues.length}`);
        }

        if (whereExpressions.length > 0) {
            query += " WHERE " + whereExpressions.join(" AND ");
        }
        // Finalize query and return results
        query += " ORDER BY full_name";
        const authorRes = await db.query(query, queryValues);
        return authorRes.rows;
    }
}

module.exports = Author;