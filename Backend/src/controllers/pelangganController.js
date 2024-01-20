const db = require("../db/dbConnection");

// GET: /pelanggan
const getAllPelanggan = (req, res) => {
    let sql = "SELECT * FROM pelanggan";
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            let response = {
                count: result.length,
                pelanggan: result
            };
            res.json(response);
        }
    });
};

// POST: /pelanggan
const searchPelanggan = (req, res) => {
    let find = req.body.find;
    let sql = `SELECT * FROM pelanggan WHERE id LIKE '%${find}%' OR nama LIKE '%${find}%' OR alamat LIKE '%${find}%'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            let response = {
                count: result.length,
                pelanggan: result
            };
            res.json(response);
        }
    });
};

// POST: /pelanggan/save
const savePelanggan = (req, res) => {
    let data = {
        id: req.body.id,
        nama: req.body.nama,
        alamat: req.body.alamat,
    };
    let message = "";
    let sql = "INSERT INTO pelanggan SET ?";
    db.query(sql, data, (err, result) => {
        if (err) {
            message = err.message;
            res.status(500).json({ error: message });
        } else {
            message = result.affectedRows + " row inserted";
            let response = {
                message: message
            };
            res.json(response);
        }
    });
};

// POST: /pelanggan/update
const updatePelanggan = (req, res) => {
    let data = [{
        id: req.body.id,
        nama: req.body.nama,
        alamat: req.body.alamat,
    }, req.body.id];
    let message = "";
    let sql = "UPDATE pelanggan SET ? WHERE id = ?";
    db.query(sql, data, (err, result) => {
        if (err) {
            message = err.message;
            res.status(500).json({ error: message });
        } else {
            message = result.affectedRows + " row updated";
            let response = {
                message: message
            };
            res.json(response);
        }
    });
};

// DELETE: /pelanggan/:id
const deletePelanggan = (req, res) => {
    let data = {
        id: req.params.id
    };
    let message = "";
    let sql = "DELETE FROM pelanggan WHERE ?";
    db.query(sql, data, (err, result) => {
        if (err) {
            message = err.message;
            res.status(500).json({ error: message });
        } else {
            message = result.affectedRows + " row deleted";
            let response = {
                message: message
            };
            res.json(response);
        }
    });
};

module.exports = {
    getAllPelanggan,
    searchPelanggan,
    savePelanggan,
    updatePelanggan,
    deletePelanggan
};
