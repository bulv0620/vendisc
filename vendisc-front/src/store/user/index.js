import { reqUserLogin, reqUserInfo, reqUserLogout } from "@/api"

export default {
    state: () => ({
        token: localStorage.getItem('USER_TOKEN') || '',
        info: null
    }),
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem('USER_TOKEN', token)
        },
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.token = ''
            state.info = null
            localStorage.removeItem('USER_TOKEN')
        }
    },
    actions: {
        async userLogin({commit}, params) {
            const res = await reqUserLogin(params)
            commit('backRoot')
            commit('setToken', res.data.token)
        },

        async userLogout({commit}, req=true) {
            if(req) await reqUserLogout()
            commit('clearFileList')
            commit('clearInfo')
        },

        async getUserInfo({commit}) {
            const {data} = await reqUserInfo()
            commit('setInfo', data)
        }
    },
    getters: {
        capacity(state) {
            return state.info?.capacity || -1
        }
    }
}