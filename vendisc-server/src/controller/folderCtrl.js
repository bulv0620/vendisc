const folderService = require('../service/folderService');
const res = require('../utils/response');

exports.createFolder = async ctx => {
    const uid = ctx.state.user.uid;
    const lid = ctx.headers.lid || null;
    const fdname = ctx.request.body.fdname;

    await folderService.insertFolder(uid, fdname, lid);

    ctx.body = res.success('create success');
}

exports.renameFolder = async ctx => {
    const {fdname, fdid} = ctx.request.body;

    await folderService.updateFolder(fdid, fdname);

    ctx.body = res.success('rename success');
}

exports.getFolderList = async ctx => {
    const lid = ctx.headers.lid || null;

    const folderList = await folderService.selectFolder(lid);

    ctx.body = res.success('get folders success', folderList);
}

exports.removeFolder = async ctx => {
    const fdid = ctx.params.fdid;

    await folderService.deleteFolder(fdid);

    ctx.body = res.success('remove success');
}