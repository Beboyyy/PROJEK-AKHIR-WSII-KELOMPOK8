const db = require("../db/dbConnection");

// GET: /pegawai
const getAllPegawai = (req, res) => {
    let sql = "SELECT * FROM pegawai";
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            let response = {
                count: result.length,
                pegawai: result
            };
            res.json(response);
        }
    });
};

// POST: /pegawai
const searchPegawai = (req, res) => {
    let find = req.body.find;
    let sql = `SELECT * FROM pegawai WHERE nip LIKE '%${find}%' OR nama LIKE '%${find}%' OR alamat LIKE '%${find}%'`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            let response = {
                count: result.length,
                pegawai: result
            };
            res.json(response);
        }
    });
};

// POST: /pegawai/save
const savePegawai = (req, res) => {
    let data = {
        nip: req.body.nip,
        nama: req.body.nama,
        alamat: req.body.alamat
    };
    let message = "";
    let sql = "INSERT INTO pegawai SET ?";
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

// POST: /pegawai/update
const updatePegawai = (req, res) => {
    let data = [{
        nip: req.body.nip,
        nama: req.body.nama,
        alamat: req.body.alamat
    }, req.body.nip];
    let message = "";
    let sql = "UPDATE pegawai SET ? WHERE nip = ?";
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

// DELETE: /pegawai/:nip
const deletePegawai = (req, res) => {
    let data = {
        nip: req.params.nip
    };
    let message = "";
    let sql = "DELETE FROM pegawai WHERE ?";
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
    getAllPegawai,
    searchPegawai,
    savePegawai,
    updatePegawai,
    deletePegawai
};
