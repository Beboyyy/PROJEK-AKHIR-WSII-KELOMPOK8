const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const pegawaiRoutes = require("./src/routes/pegawaiRoutes");
const pelangganRoutes = require('./src/routes/pelangganRoutes');
const bukuRoutes = require('./src/routes/bukuRoutes');



// Menggunakan Cors untuk mengizinkan akses dari berbagai domain
app.use(cors());

// Menggunakan bodyParser untuk mengelola data yang masuk
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Menggunakan pegawaiRoutes untuk semua endpoint pegawai
app.use("/pegawai", pegawaiRoutes);
app.use('/pelanggan', pelangganRoutes);
app.use('/buku', bukuRoutes);



// Mengaktifkan server untuk mendengarkan permintaan pada port 2910
app.listen(1928, () => {
    console.log("Server run on port 1928");
});
