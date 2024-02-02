const fileService = require('../service/fileService');
const res = require('../utils/response');

exports.uploadFile = async ctx => {
    const { uid, capacity } = ctx.state.user;
    const lid = ctx.headers.lid || null;
    const { originalFilename: fname, filepath, newFilename, size } = ctx.request.files.file;

    const url = '/files/' + newFilename;
    const uri = filepath;

    await fileService.saveFile({ fname, url, uri, size, uid, lid }, capacity);

    ctx.body = res.success('upload success');
}

exports.removeFile = async ctx => {
    const fid = ctx.params.fid;

    await fileService.deleteFile(fid);

    ctx.body = res.success('remove success');
}

exports.renameFile = async ctx => {
    const {fid, fname} = ctx.request.body;

    await fileService.updateFileName(fid, fname);

    ctx.body = res.success('rename success');
}

exports.getFileList = async ctx => {
    const lid = ctx.headers.lid || null;

    const fileList = await fileService.getFileList(lid);

    ctx.body = res.success('get files success', fileList);
}

exports.getUsedCapacity = async ctx => {
    const uid = ctx.state.user.uid;

    const usedCapacity = await fileService.getUsedCapacity(uid);

    ctx.body = res.success('get used capacity success', {usedCapacity});
}

exports.moveFile = async ctx => {
    const {fid, fdid} = ctx.request.body;

    await fileService.updateFileLid(fid, fdid);

    ctx.body = res.success('move success');
}
