import axios from 'axios'
import nProgress from 'nprogress';
import store from '@/store'
import router from '@/router'
import { SERVER_URL } from '@/api/server';
const ConfigBaseURL = SERVER_URL + '/api'

const request = axios.create({
    timeout: 10000, // 请求超时时间
    baseURL: ConfigBaseURL,
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 添加请求拦截器
request.interceptors.request.use(config => {
    const token = store.state.user.token
    const lid = store.getters.curLid
    nProgress.start()
    config.headers.Authorization = token
    config.headers.lid = lid
    return config
})

// 添加响应拦截器
request.interceptors.response.use(response => {
    nProgress.done()
    const res = response.data
    if (res.code > 0) {
        return res
    }
    else {
        if(res.code === -25){
            localStorage.removeItem('USER_TOKEN')
            store.dispatch('userLogout', false)
            router.push('/login')
        }
        return Promise.reject(response.data.msg)
    }
}, error => {
    nProgress.done()
    return Promise.reject(error)
})

export default request