import req from '@/utils/request'

/**
 * 
 * @param {string} params.username 
 * @param {string} params.password 
 * @returns 
 */
export const reqUserLogin = (params) => req.post('/user/login', params)

/**
 * 
 * @param {string} email 
 * @returns 
 */
export const reqRetrievePwd = (email) => req.get(`/user/retrieve/${email}`)

export const reqUserLogout = () => req.get('/user/logout')

/**
 * 
 * @param {string} params.oldPwd 
 * @param {string} params.newPwd
 * @returns 
 */
export const reqEditPassword = (params) => req.post('/user/password', params)

export const reqUserInfo = () => req.get('/user/info')

export const reqGetList = () => req.get('/list')

export const reqGetUsedCapacity = () => req.get('/file/used')

/**
 * 
 * @param {string} params.username 
 * @param {string} params.password
 * @param {string} params.password2
 * @param {string} params.uname
 * @param {string} params.email
 * @returns 
 */
export const reqUserRegister = (params) => req.post('/user/register', params)

/**
 * 
 * @param {int} params.fid
 * @param {string} params.fname
 * @returns 
 */
export const reqRenameFile = (params) => req.post('/file/rename', params)

/**
 * 
 * @param {int} params.fdid
 * @param {string} params.fdname
 * @returns 
 */
export const reqRenameFolder = (params) => req.post('/folder/rename', params)

export const reqCreateFolder = (fdname) => req.post('/folder/create', {fdname})

export const reqRemoveFile = (fid) => req.get(`/file/remove/${fid}`)

export const reqRemoveFolder = (fdid) => req.get(`/folder/remove/${fdid}`)

export const reqMoveFile = (fid, fdid) => req.post('/file/move', {fid, fdid})