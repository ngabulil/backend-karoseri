const { Router } = require("express")
const router = Router()
const AuthUserRoute = require("./AuthUser")
const CarTypeRoute = require("./CarType")
const MobilRoute = require("./Mobil")
const MessageRoute = require("./Messages")

router.use(AuthUserRoute)
router.use(CarTypeRoute)
router.use(MobilRoute)
router.use(MessageRoute)

module.exports = router