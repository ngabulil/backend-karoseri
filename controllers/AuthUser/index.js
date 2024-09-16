const {
    User
} = require('../../models');
const {
    customRes
} = require('../../utils/responseUtil')
const bcrypt = require('bcrypt');
const {
    generateAccessToken,
    generateRefreshToken
} = require('../../utils/tokenUtil');
const { secretRegist } = require('../../config/secret');

const register = async (req, res) => {
    try {
        const {
            username,
            password,
            secret,
        } = req.body;
        if (!secret || secret !== secretRegist) {
            return customRes(res, 400, 'invalid secret');
        }
        if (!username || !password) {
            return customRes(res, 400, 'username or password are required');
        }
        const user = await User.findOne({
            where: {
                username
            }
        });
        if (user) {
            return customRes(res, 409, 'user already exists');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        await User.create({
            username,
            password: hashedPassword
        });
        return customRes(res, 201, 'user created');
    } catch (error) {
        console.log(error);
        return customRes(res, 500, 'internal server error');
    }
}

const login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        if (!username || !password) {
            return customRes(res, 400, 'username or password are required');
        }
        const user = await User.findOne({
            where: {
                username,
            }
        });
        if (!user) {
            return customRes(res, 404, 'user not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return customRes(res, 401, 'invalid password');
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        return customRes(res, 200, 'user logged in', {
            access_token: accessToken,
            refresh_token: refreshToken
        });
    } catch (error) {
        console.log(error);
        return customRes(res, 500, 'internal server error');
    }
}

module.exports = {
    register,
    login
}