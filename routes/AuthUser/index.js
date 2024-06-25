const { Router } = require("express")
const router = Router()
const { login, register } = require("../../controllers/AuthUser")
const refreshToken = require("../../controllers/Token")


router.post("/login", login)
router.post("/register", register)
router.put("/refresh-token", refreshToken)

module.exports = router