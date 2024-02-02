import Validator from "validator";

const isEmpty = value =>{
	return value === undefined || value ===null ||
	(typeof value ==="object"&& Object.keys(value).length===0) ||
	(typeof value === "string" && value.trim().length ===0)
}

export const validate = (validatorFn, scope, ...args) => {
    const { errors, isValid } = validatorFn(...args);
    if (!isValid) {
        Object.keys(errors).forEach(item => {
            scope[item + 'Error'] = true
            scope[item + 'ErrorMsg'] = errors[item]
        });
        return false;
    }
    return true;
}

export const passwordValidator = (password) => {
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

export const loginValidator = (username, password) => {
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

/**
 * 
 * @param {string} user.username 
 * @param {string} user.password 
 * @param {string} user.password2 
 * @param {string} user.uname
 * @param {string} user.email 
 * @returns 
 */
export const registerValidator = (user) => {
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

export const editPwdValidator = (oldPwd, newPwd) => {
    let errors = {};

    oldPwd = !isEmpty(oldPwd) ? oldPwd : '';
    newPwd = !isEmpty(newPwd) ? newPwd : '';

    if (Validator.isEmpty(oldPwd)) {
        errors.oldPwd = "Old password can not be empty";
    }

    if (Validator.isEmpty(newPwd)) {
        errors.newPwd = "New password can not be empty";
    }

    if (!Validator.isLength(newPwd, { min: 6, max: 16 })) {
        errors.newPwd = "New password length must be between 6-16";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export const emailValidator = (email) => {
    let errors = {}

    email = !isEmpty(email) ? email : '';

    if (Validator.isEmpty(email)) {
        errors.email = "Email can not be empty";
    }

    if(!Validator.isEmail(email)){
        errors.email = "Invalid email address";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

export const nameValidator = (name, attrName = 'name') => {
    let errors = {};

    name = !isEmpty(name) ? name : '';

    if (Validator.isEmpty(name)) {
        errors[attrName] = "Name can not be empty";
    }

    if (!Validator.isLength(name, { min: 1, max: 20 })) {
        errors[attrName] = "Name length must be between 1-20";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}