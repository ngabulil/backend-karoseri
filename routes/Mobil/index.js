const { Router } = require("express")
const router = Router()
const { getAllMobil, createMobil, updateMobil, deleteMobil } = require("../../controllers/Mobil")
const uploadImage = require("../../middlewares/uploadImage")
const authToken = require("../../middlewares/authToken")

router.get("/mobil", getAllMobil)
router.post("/mobil", authToken, uploadImage.array("images", 5), createMobil)
router.put("/mobil/:id", authToken, uploadImage.array("images", 5), updateMobil)
router.delete("/mobil/:id", authToken, deleteMobil)

module.exports = router