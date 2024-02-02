const isEmpty = require('../utils/isEmpty');
const Validator = require('validator');

const folderNameValidator = (fdname) => {
    let errors = {};

    fdname = !isEmpty(fdname) ? fdname : '';


    if(Validator.isEmpty(fdname)) {
        errors.fdname = 'Folder name can not be empty';
    }

    if(!Validator.isLength(fdname, {min: 1, max:20})){
        errors.fdname = 'Folder name length must be between 1-20'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

const folderValidator = (fdid, fdname) => {
    let errors = Object.assign({}, folderNameValidator(fdname).errors);

    fdid = !isEmpty(fdid) ? fdid : '';

    if(Validator.isEmpty(fdid.toString())) {
        errors.fdid = 'Folder id can not be empty';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = {
    folderNameValidator, folderValidator
}