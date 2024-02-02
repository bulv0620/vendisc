import { reqGetList, reqGetUsedCapacity, reqMoveFile } from '@/api'

export default {
    state: () => ({
        list: [],
        usedCapacity: 0,
        dragFileId: '',
        dropFolderId: '',
    }),
    mutations: {
        clearFileList(state){
            state.list = []
        },

        setList(state, list) {
            state.list = list
        },

        setUsedCapacity(state, usedCapacity) {
            state.usedCapacity = usedCapacity
        },

        setDragFildId(state, id) {
            state.dragFileId = id
        },

        setDropFolderId(state, id) {
            state.dropFolderId = id
        }

    },
    actions: {
        async getList({ commit }) {
            const { data } = await reqGetList()
            commit('setList', data)
        },

        async getUsedCapacity({ commit }) {
            const { data: { usedCapacity } } = await reqGetUsedCapacity()
            commit('setUsedCapacity', usedCapacity)
        },

        async moveFile({ state, commit }) {
            await reqMoveFile(state.dragFileId, state.dropFolderId)
            commit('setDragFildId', '')
            commit('setDropFolderId', '')
        }
    },
    getters: {
        capacityRatio(state, getters) {
            const ratio = (state.usedCapacity / getters.capacity).toFixed(2)
            return (ratio >= 1 || ratio < 0 ? 1 : ratio) || 0
        }
    }
}