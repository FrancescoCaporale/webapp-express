const mysql = require("mysql2/promise");

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "la_tua_password",
    database: "movies_db"
});

module.exports = connection;