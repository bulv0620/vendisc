const isEmpty = require('../utils/isEmpty');
const Validator = require('validator');

const passwordValidator = (password) => {
    let errors = {};

    password = !isEmpty(password) ? password : '';

    if (Validator.isEmpty(password)) {
        errors.password = "Password can not be empty";
    }

    if (!Validator.isLength(password, { min: 6, max: 16 })) {
        errors.password = "Password length must be between 6-16";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

const loginValidator = (username, password) => {
    let errors = Object.assign({}, passwordValidator(password).errors);

    username = !isEmpty(username) ? username : '';

    if (Validator.isEmpty(username)) {
        errors.username = "Username can not be empty";
    }

    if (!Validator.isLength(username, { min: 6, max: 16 })) {
        errors.username = "Username length must be between 6-16";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

const registerValidator = (user) => {
    let errors = Object.assign({}, loginValidator(user.username, user.password).errors);

    user.password2 = !isEmpty(user.password2) ? user.password2 : '';
    user.uname = !isEmpty(user.uname) ? user.uname : '';
    user.email = !isEmpty(user.email) ? user.email : '';

    if (Validator.isEmpty(user.password2)) {
        errors.password2 = "Confirm password can not be empty";
    }

    if (!Validator.equals(user.password, user.password2)) {
        errors.password2 = "The two passwords do not match";
    }

    if (Validator.isEmpty(user.uname)) {
        errors.uname = "Uname can not be empty";
    }

    if (!Validator.isLength(user.uname, { min: 1, max: 20 })) {
        errors.uname = "Nickname length must be between 1-20";
    }

    if (Validator.isEmpty(user.email)) {
        errors.email = "Email can not be empty";
    }

    if (!Validator.isEmail(user.email)) {
        errors.email = "Invalid email address";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = {
    registerValidator,
    loginValidator,
    passwordValidator
}