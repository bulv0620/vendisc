const Token = require('../model/tokenModel');
const jwt = require('../utils/jwt');
const ERROR = require('../config/error.json');
const { Op } = require('sequelize')

const insertToken = async (token, uid, ip) => {
    const [, created] = await Token.findOrCreate({
        where: { uid, ip },
        defaults: { token }
    })

    if (!created) {
        await Token.update({ token, timestamp: Date.now() }, {
            where: { uid, ip }
        })
    }
}

const verify = async (token) => {
    const userInfo = jwt.jwtVerify(token);

    if (!userInfo) {
        throw new ReqError(ERROR.PERMISSION_DENIED, 'Permission denied1');
    }

    const res = await Token.findAll({
        where: {
            uid: userInfo.uid,
            timestamp: {
                // [Op.lt]: new Date(),
                [Op.gt]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000)
            }
        }
    })

    for (let i = res.length - 1; i >= 0; i--) {
        const resToken = res[i].dataValues.token;
        if (resToken === token) {
            return userInfo
        }
    }
    
    throw new ReqError(ERROR.PERMISSION_DENIED, 'Permission denied2');
}

const verifyWithIp = async (token, ip) => {
    const userInfo = jwt.jwtVerify(token);

    if (!userInfo) {
        throw new ReqError(ERROR.PERMISSION_DENIED, 'Permission denied1');
    }

    const res = await Token.findOne({
        where: {
            uid: userInfo.uid,
            ip
        }
    })

    if (!res || res.token !== token) {
        throw new ReqError(ERROR.PERMISSION_DENIED, 'Permission denied2');
    }

    return userInfo;
}

const removeToken = async (token) => {
    await Token.destroy({
        where: {token}
    })
}

const removeTokenByUidAndIp = async (uid, ip) => {
    await Token.destroy({
        where: ip ? { uid, ip } : { uid }
    })
}

module.exports = {
    insertToken,
    verify,
    removeToken,
    verifyWithIp,
    removeTokenByUidAndIp
}