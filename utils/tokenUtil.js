const { secretKey } = require('../config/secret')
const jwt = require('jsonwebtoken')

const generateAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
    }, secretKey, {
        expiresIn: '1h'
    })
}

const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user.id,
    }, secretKey, {
        expiresIn: '1d'
    })
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey)
    } catch (error) {
        return null;
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
}