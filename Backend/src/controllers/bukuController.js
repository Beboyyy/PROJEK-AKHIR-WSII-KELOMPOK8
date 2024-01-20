const db = require("../db/dbConnection");

const getBuku = (req, res) => {
    db.query('SELECT * FROM buku', (err, result) => {
        if (err) throw err;
        res.json({ buku: result });
    });
};

const findBuku = (req, res) => {
    const searchTerm = req.body.find;
    db.query('SELECT * FROM buku WHERE judul LIKE ?', [`%${searchTerm}%`], (err, result) => {
        if (err) throw err;
        res.json({ buku: result });
    });
};

const saveBuku = (req, res) => {
    const { kode, judul, penulis, penerbit, qty } = req.body;
    db.query('INSERT INTO buku (kode, judul, penulis, penerbit, qty) VALUES (?, ?, ?, ?, ?)', [kode, judul, penulis, penerbit, qty], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Book saved successfully' });
    });
};

const updateBuku = (req, res) => {
    const { kode, judul, penulis, penerbit, qty } = req.body;
    db.query('UPDATE buku SET judul=?, penulis=?, penerbit=?, qty=? WHERE kode=?', [judul, penulis, penerbit, qty, kode], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Book updated successfully' });
    });
};

const deleteBuku = (req, res) => {
    const kode = req.params.kode;
    db.query('DELETE FROM buku WHERE kode=?', [kode], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Book deleted successfully' });
    });
};

module.exports = { 
    getBuku, 
    findBuku, 
    saveBuku, 
    updateBuku, 
    deleteBuku 
};
