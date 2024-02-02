const CODE = require('../config/code.json');
const isEmpty = require('./isEmpty');

exports.success = (msg = 'success', data) => {
    const res = {
        code: CODE.SUCCESS_CODE,
        msg
    }
    if(!isEmpty(data)) {
        res.data = data;
    }
    return res;
}

exports.error = (msg = 'error', data, code=CODE.ERROR_CODE) => {
    const res = {
        code,
        msg
    }
    if(!isEmpty(data)) {
        res.data = data;
    }
    return res;
}