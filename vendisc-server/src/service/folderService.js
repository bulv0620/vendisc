const Folder = require('../model/FolderModel');
const { folderNameValidator, folderValidator } = require('../validator/folderValidator');
const ERROR = require('../config/error.json');
const File = require('../model/FileModel');

const insertFolder = async (uid, fdname, lid = null) => {
    const { errors, isValid } = folderNameValidator(fdname);

    // 验证输入合法性
    if (!isValid) {
        throw new ReqError(ERROR.INVALID_INPUT, 'Invalid input', errors);
    }

    // 不存在则创建
    const [folder, created] = await Folder.findOrCreate({
        where: { uid, lid, fdname }
    });

    if (!created) {
        throw new ReqError(ERROR.FOLDER_EXIST, 'Folder exist');
    }

    return folder.fdid
};

const updateFolder = async (fdid, fdname) => {
    const { errors, isValid } = folderValidator(fdid, fdname);

    // 验证输入合法性
    if (!isValid) {
        throw new ReqError(ERROR.INVALID_INPUT, 'Invalid input', errors);
    }

    // 更新文件夹名字
    await Folder.update({ fdname }, {
        where: { fdid }
    })
};

const selectFolder = async (lid) => {
    const res = await Folder.findAll({ where: { lid } });

    return res
};

const deleteFolder = async (fdid) => {
    const res1 = await Folder.findOne({ where: { lid: fdid } });
    // 存在子文件夹的情况
    if (res1) {
        throw new ReqError(ERROR.FOLDER_IS_NOT_EMPTY, 'Folder is not empty');
    }

    const res2 = await File.findOne({ where: { lid: fdid } });
    // 存在子文件的情况
    if(res2) {
        throw new ReqError(ERROR.FOLDER_IS_NOT_EMPTY, 'Folder is not empty');
    }

    const affectedRows = await Folder.destroy({where: {fdid}});

    // 文件夹不存在
    if(affectedRows === 0){
        throw new ReqError(ERROR.FOLDER_NOT_EXIST, 'Folder is not exist');
    }
}


module.exports = {
    insertFolder, updateFolder, selectFolder, deleteFolder
}