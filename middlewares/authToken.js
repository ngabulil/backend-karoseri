const { customRes } = require("../utils/responseUtil")
const { verifyToken } = require("../utils/tokenUtil")

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return customRes(res, 401, 'token not found')
    }
    const user = verifyToken(token)
    if (!user) {
        return customRes(res, 401, 'invalid token')
    }
    req.userId = user.id
    next()
}

module.exports = authToken