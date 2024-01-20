const express = require('express');
const bukuController = require('../controllers/bukuController');
const router = express.Router();

router.get('/', bukuController.getBuku);
router.post('/', bukuController.findBuku);
router.post('/save', bukuController.saveBuku);
router.patch('/update', bukuController.updateBuku);
router.delete('/:kode', bukuController.deleteBuku);

module.exports = router;
