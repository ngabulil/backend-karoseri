const { Router } = require('express');
const { getAllType, createType, updateType, deleteType } = require('../../controllers/CarType');
const authToken = require('../../middlewares/authToken');
const router = Router();

router.get('/tipe-mobil', getAllType);
router.post('/tipe-mobil', authToken, createType);
router.put('/tipe-mobil/:id', authToken, updateType);
router.delete('/tipe-mobil/:id', authToken, deleteType);

module.exports = router