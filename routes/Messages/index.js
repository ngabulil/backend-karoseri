const { Router } = require("express")
const router = Router()
const { createMessage } = require("../../controllers/Message")

router.post("/message", createMessage)

module.exports = router