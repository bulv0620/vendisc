const jwt = require('jsonwebtoken');
const JWT_CONFIG = require('../config/jwt.json');

exports.jwtSign = (data) => {
    const token = jwt.sign(data, JWT_CONFIG.JWT_DEFAULT_SECRET, JWT_CONFIG.JWT_DEFAULT_CONFIG);
    return token;
}

exports.jwtVerify = (authorization) => {
    const token = authorization.replace('Bearer ', '');
    try {
        const data = jwt.verify(token, JWT_CONFIG.JWT_DEFAULT_SECRET);
        return data;
    } catch (e) {
        return null;   
    }
}