const isEmpty = require('../utils/isEmpty');
const Validator = require('validator');

const fileNameValidator = (fname) => {
    let errors = {};

    fname = !isEmpty(fname) ? fname : '';

    if(Validator.isEmpty(fname)) {
        errors.fdname = 'File name can not be empty';
    }

    if(!Validator.isLength(fname, {min: 1, max:20})){
        errors.fdname = 'File name length must be between 1-20'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = {
    fileNameValidator
}