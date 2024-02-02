const ERROR = require('../config/error.json');

class ReqError extends Error {
    constructor(code=ERROR.UNEXPECTED_ERROR, msg='An error occurred', errors={}) {
        super(msg + `, code: ${code}`);
        // super(msg);
        this.code = code;
        this.errors = errors;
    }
}

module.exports = ReqError;