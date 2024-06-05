const pool = require('../services/db');

var userModel = {
    selectAllUsers: (callback) => {

        const SQLSTATMENT = ` SELECT * FROM user; `;
        pool.query(SQLSTATMENT, callback);
    },

    selectUserById: (data, callback) => {

        const SQLSTATMENT = ` SELECT * FROM user WHERE userid = ?; `;
        const VALUES = [data.userid];
        console.log("Querying DB at selectUserById")
        pool.query(SQLSTATMENT, VALUES, callback);

    },

    insertNewUser: (data, callback) => {

        const SQLSTATMENT = ` INSERT INTO user (username, email,role,password) VALUES (?,?,?,?); `;
        const VALUES = [data.username, data.email, data.role, data.password];
        pool.query(SQLSTATMENT, VALUES, callback);

    },
    updateUserById: (data, callback) => {

        const SQLSTATMENT = ` UPDATE user SET email=?, password=? WHERE userid=?; `;
        const VALUES = [data.email, data.password, data.userid];
        pool.query(SQLSTATMENT, VALUES, callback);
    },

    deleteUserById: (data, callback) => {
        const SQLSTATMENT = ` DELETE FROM user WHERE userid = ? `;
        const VALUES = [data.userid];
        pool.query(SQLSTATMENT, VALUES, callback);

    },

    loginUser: (data, callback) => {
        const SQLSTATMENT = ` SELECT * FROM user WHERE email = ? `;
        const VALUES = [data.email];
        pool.query(SQLSTATMENT, VALUES, callback);

    },

    selectUserByUsernameOrEmail: (data, callback) => {
        const SQLSTATMENT = ` SELECT * FROM user WHERE email = ? or username=? `;
        const VALUES = [data.email, data.username];
        console.log("Querying DB at selectUserByUsernameOrEmail")
        pool.query(SQLSTATMENT, VALUES, callback);

    }
}

module.exports = userModel;