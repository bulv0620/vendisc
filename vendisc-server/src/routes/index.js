const Router = require('@koa/router');
const fileCtrl = require('../controller/fileCtrl');
const folderCtrl = require('../controller/folderCtrl');
const userCtrl = require('../controller/userCtrl');
const tokenCtrl = require('../controller/tokenCtrl');
const listCtrl = require('../controller/listCtrl');

const FILE_BASE_URL = '/api/file';
const FOLDER_BASE_URL = '/api/folder';
const USER_BASE_URL = '/api/user';

const router = new Router();

router.get('/', async ctx => {
    ctx.status = 301;
    ctx.redirect('/views');
})

// 获取当前位置的文件夹和文件
router.get('/api/list', tokenCtrl.jwtVerify, listCtrl.getCurList);

// 获取文件列表
router.get(`${FILE_BASE_URL}/list`, tokenCtrl.jwtVerify, fileCtrl.getFileList);
// 删除文件
router.get(`${FILE_BASE_URL}/remove/:fid`, tokenCtrl.jwtVerify, fileCtrl.removeFile);
// 下载文件
router.get(`${FILE_BASE_URL}/download/:fid`, () => {});
// 获取已使用容量
router.get(`${FILE_BASE_URL}/used`, tokenCtrl.jwtVerify, fileCtrl.getUsedCapacity)
// 移动文件
router.post(`${FILE_BASE_URL}/move`, tokenCtrl.jwtVerify, fileCtrl.moveFile);
// 上传文件
router.post(`${FILE_BASE_URL}/upload`, tokenCtrl.jwtVerify, fileCtrl.uploadFile);
// 重命名文件
router.post(`${FILE_BASE_URL}/rename`, tokenCtrl.jwtVerify, fileCtrl.renameFile);

// 获取文件夹列表
router.get(`${FOLDER_BASE_URL}/list`, tokenCtrl.jwtVerify, folderCtrl.getFolderList);
// 删除文件夹
router.get(`${FOLDER_BASE_URL}/remove/:fdid`, tokenCtrl.jwtVerify, folderCtrl.removeFolder);
// 创建文件夹
router.post(`${FOLDER_BASE_URL}/create`, tokenCtrl.jwtVerify, folderCtrl.createFolder);
// 重命名文件夹
router.post(`${FOLDER_BASE_URL}/rename`, tokenCtrl.jwtVerify, folderCtrl.renameFolder);

// 用户重命名
router.get(`${USER_BASE_URL}/rename/:name`, tokenCtrl.jwtVerify, userCtrl.editName);
// 用户修改邮箱
router.get(`${USER_BASE_URL}/email/:email`, tokenCtrl.jwtVerify, userCtrl.editEmail);
// 用户忘记密码
router.get(`${USER_BASE_URL}/retrieve/:email`, userCtrl.retrievePassword);
// 用户注销
router.get(`${USER_BASE_URL}/logout`, tokenCtrl.jwtVerify, userCtrl.userLogout);
// 用户注册
router.post(`${USER_BASE_URL}/register`, userCtrl.userRegister);
// 用户登录
router.post(`${USER_BASE_URL}/login`, userCtrl.userLogin);
// 用户修改密码
router.post(`${USER_BASE_URL}/password`, tokenCtrl.jwtVerify, userCtrl.editPassword);
// 获取用户信息
router.get(`${USER_BASE_URL}/info`, tokenCtrl.jwtVerify, userCtrl.getUserInfo);

module.exports = router;