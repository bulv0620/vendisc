const User = require('../model/UserModel');
const { registerValidator, loginValidator, passwordValidator } = require('../validator/userValidator');
const ERROR = require('../config/error.json');
const { jwtSign } = require('../utils/jwt');
const sha256 = require('sha256');
const { sendMail } = require('../utils/transporter');
const { randomPwd } = require('../utils/random');

const insertUser = async (user) => {
    const { errors, isValid } = registerValidator(user);

    // 验证输入合法性
    if (!isValid) {
        throw new ReqError(ERROR.INVALID_INPUT, 'Invalid input', errors);
    }

    // 验证用户名是否重复
    const res1 = await User.findOne({ where: { username: user.username } });
    if (res1) {
        throw new ReqError(ERROR.USERNAME_EXIST, 'Username exist');
    }
    // 验证邮箱是否重复
    const res2 = await User.findOne({ where: { email: user.email } });
    if (res2) {
        throw new ReqError(ERROR.EMAIL_EXIST, 'This email is already registered');
    }
    // 创建实例提交事务
    user.password = sha256(user.password); // 加密密码
    const userInstance = await User.create(user);
    await userInstance.save();

    return userInstance.uid;
};

const checkLogin = async (username, password) => {
    const { errors, isValid } = loginValidator(username, password);

    // 验证输入合法性
    if (!isValid) {
        throw new ReqError(ERROR.INVALID_INPUT, 'Invalid input', errors);

    }

    const user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            username, password: sha256(password)
        }
    });

    // 命中则返回用户信息，否则账号密码错误
    if (!user) {
        throw new ReqError(ERROR.INCORRECT_USERNAME_OR_PASSWORD, 'Incorrect username or password');
    }

    // 返回token
    return {
        token: jwtSign(user.dataValues),
        user
    };
};

const updateUname = async (name, uid) => {
    await User.update({ uname: name }, {
        where: { uid }
    })
};

const updatePassword = async (newPwd, oldPwd, uid) => {
    const { errors, isValid } = passwordValidator(newPwd);

    // 验证新密码是否合法
    if (!isValid) {
        throw new ReqError(ERROR.INVALID_INPUT, 'Invalid input', errors);
    }

    // 密码加密处理
    newPwd = sha256(newPwd);
    oldPwd = sha256(oldPwd);

    // 更新密码, 影响行数>0则为更新成功
    const [columns] = await User.update({ password: newPwd }, {
        where: {
            uid, password: oldPwd
        }
    })

    if (columns === 0) {
        throw new ReqError(ERROR.WRONG_OLD_PASSWORD, 'Old password wrong');
    }
};

const updateEmail = async (email, uid) => {
    await User.update({ email }, {
        where: { uid }
    })
};

const sendTemporaryPassword = async (email) => {
    const res = await User.findOne({
        where: { email }
    })

    // 如果没有命中, 则该邮箱未注册
    if (!res) {
        throw new ReqError(ERROR.EMAIL_NOT_EXIST, 'This email has not been registered');
    }

    // 重置密码并发送邮件
    const temporaryPwd = randomPwd()
    await User.update({ password: sha256(temporaryPwd) }, {
        where: { email }
    })
    await sendMail(email, temporaryPwd);

    return res.uid;
};

const updateRootId = async (uid, fdid) => {
    await User.update({ root_id: fdid }, {
        where: {
            uid
        }
    })
}

module.exports = {
    insertUser, checkLogin, updateUname, updatePassword, updateEmail, sendTemporaryPassword, updateRootId
}