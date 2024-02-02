const userService = require('../service/userService');
const tokenService = require('../service/tokenService');
const folderService = require('../service/folderService');
const res = require('../utils/response');

exports.userRegister = async ctx => {
    const {username, password, password2, uname, email} = ctx.request.body;
    const user = {username, password, password2, uname, email};

    const uid = await userService.insertUser(user);
    const fdid = await folderService.insertFolder(uid, 'Home');
    await userService.updateRootId(uid, fdid)

    ctx.body = res.success('register success');
}

exports.userLogin = async ctx => {
    const {username, password} = ctx.request.body;
    const ip = ctx.request.ip;
    
    const {token, user} = await userService.checkLogin(username, password);

    // 记录token, 同uid+ip指向唯一token
    await tokenService.insertToken(token, user.uid, ip);

    ctx.body = res.success('login success', {token, user})
}

exports.editName = async ctx => {
    const name = ctx.params.name;
    const uid = ctx.state.user.uid;

    await userService.updateUname(name, uid);

    ctx.body = res.success('rename success');
}

exports.editPassword = async ctx => {
    const {oldPwd, newPwd} = ctx.request.body;
    const uid = ctx.state.user.uid;

    await userService.updatePassword(newPwd, oldPwd, uid);
    // 清空登记的token
    // await tokenService.removeToken(uid);

    ctx.body = res.success('edit password success');
}

exports.editEmail = async ctx => {
    const email = ctx.params.email;
    const uid = ctx.state.user.uid;

    await userService.updateEmail(email, uid);

    ctx.body = res.success('edit email success');
}

exports.retrievePassword = async ctx => {
    const email = ctx.params.email;

    const uid = await userService.sendTemporaryPassword(email);
    // 清空登记的token
    await tokenService.removeToken(uid);

    ctx.body = res.success('Your password has been reset, and the temporary password has been sent to your email. Please check it in time and modify it immediately after logging in.')
}

exports.userLogout = async ctx => {
    const { authorization } = ctx.request.header;

    await tokenService.removeToken(authorization)

    ctx.body = res.success('logout success');
}

exports.getUserInfo = async ctx => {
    ctx.body = res.success('get user info success', ctx.state.user);
}