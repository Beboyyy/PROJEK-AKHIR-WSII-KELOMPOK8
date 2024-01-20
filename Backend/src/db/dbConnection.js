const mysql = require("mysql");


const db = mysql.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    database: "tugasbesar"
});

db.connect(err => {
    if (err) console.log(err.message);
    else console.log("koneksi berhasil");
});

module.exports = db;
