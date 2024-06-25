const {
    customRes
} = require("../../utils/responseUtil")
const {
    verifyToken,
    generateAccessToken
} = require("../../utils/tokenUtil")


const refreshToken = (req, res) => {
    const {
        refreshToken
    } = req.body
    if (!refreshToken) {
        return customRes(res, 400, 'refresh token not found')
    }
    const decoded = verifyToken(refreshToken)
    if (!decoded) {
        return customRes(res, 401, 'invalid refresh token')
    }
    const accessToken = generateAccessToken(decoded)
    return customRes(res, 200, 'access token refreshed', {
        access_token: accessToken
    })
}

module.exports = refreshToken