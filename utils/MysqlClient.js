const config = require("../config");

const db_host = config.MYSQL_HOST;
const db_username = config.MYSQL_USER;
const password = config.MYSQL_PASSWORD;
const database = config.MYSQL_DB;

const mysql = require("mysql2");
const pool = mysql.createPool({
    host: db_host,
    user: db_username,
    password: password,
    database: database,
});

let query = function (sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        });
    });
};

module.exports = {
    query,
};
