
const db = require('../db');
const { UnauthorizedError } = require('../helpers/ExpressError');

class Api {
    /* Authenticates password by comparing password in db.*/
    static async authenticate(username, password) {
        const result = await db.query(
            "SELECT username, password FROM users WHERE username = $1",
            [username]);
        let user = result.rows[0];

        if (user) {
            const isValid = user.password === password
            if (isValid === true) {
                delete user.password;
                return user;
            }
            else {
                throw new UnauthorizedError("Invalid password");
            }
        }
        else {
            throw new UnauthorizedError("Invalid username/password");
        };
    };

    /* Returns userInfo if exists, otherwise throw UnathorizedError */
    static async getUserInfo(username) {
        const userRes = await db.query(
            'SELECT username, first_name, last_name, is_admin, email FROM users WHERE username=$1',
            [username]);
        const userInfo = userRes.rows[0];
        if (!userInfo) throw new UnauthorizedError(`Username ${username} not found`);
        return userInfo;

    };
};

module.exports = Api;


