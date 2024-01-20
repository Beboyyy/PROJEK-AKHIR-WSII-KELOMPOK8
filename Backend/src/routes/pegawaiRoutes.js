const express = require("express");
const router = express.Router();
const pegawaiController = require("../controllers/pegawaiController");

// GET: /pegawai --> end point untuk mengakses data pegawai
router.get("/", pegawaiController.getAllPegawai);

// POST: /pegawai --> end point untuk pencarian data pegawai
router.post("/", pegawaiController.searchPegawai);

// POST: /pegawai/save --> end point untuk insert data pegawai
router.post("/save", pegawaiController.savePegawai);

// PATCH: /pegawai/update --> end point untuk update data pegawai
router.patch("/update", pegawaiController.updatePegawai);

// DELETE: /pegawai/:nip --> end point untuk hapus data pegawai
router.delete("/:nip", pegawaiController.deletePegawai);

module.exports = router;
