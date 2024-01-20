// routes/pelangganRoutes.js
const express = require("express");
const router = express.Router();
const pelangganController = require('../controllers/pelangganController');

router.get('/', pelangganController.getAllPelanggan);
router.post('/save', pelangganController.savePelanggan);
router.delete('/:id', pelangganController.deletePelanggan);
router.patch('/update', pelangganController.updatePelanggan);
router.post('/', pelangganController.searchPelanggan);

module.exports = router;
