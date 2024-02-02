<template>
    <div id="home-view">
        <TopBar @refresh="loadData"></TopBar>
        <FileTable :list="files" :selectedItem.sync="selectedItem" @refresh="loadData" @openFolder="openFolder" @handleCopyUrl="copyUrl">
        </FileTable>
        <SmartBar :selectedType="selectedType" @clear="clearSelected" @refresh="loadData" @openFolder="openFolder"
            @handleDelete="removeDialog = true" @handleRename="renameDialog = true;renameInput = selectedItem.name"
            @handleCreateFolder="folderDialog = true; folderInput=''" @handleCopyUrl="copyUrl"
            @handleDownload="download" @handleUploadFile="uploadDialog = true" :downloading="downloading"
            :downloadFilename="downloadFilename" :downloadRatio="downloadRatio" @abortTask="abortDownload">
        </SmartBar>

        <MyDialog :show.sync="folderDialog" title="Input new name" @handleOk="createFolder"
            :loading="createFolderLoading">
            <MyInput :value.sync="folderInput" icon="bowling-ball" :error="folderInputError" :msg="folderInputErrorMsg"
                placeholder="Input New Folder Name">
            </MyInput>
        </MyDialog>

        <MyDialog :show.sync="renameDialog" title="Input new name" @handleOk="handleRename" :loading="renameLoading">
            <MyInput :value.sync="renameInput" icon="bowling-ball" :error="renameInputError" :msg="renameInputErrorMsg"
                placeholder="Input New Name">
            </MyInput>
        </MyDialog>

        <MyDialog :show.sync="removeDialog" title="Confirm" @handleOk="removeItem">
            <p>
                The operation is irreversible, whether to execute?
            </p>
        </MyDialog>

        <UploadDialog :show.sync="uploadDialog"></UploadDialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import FileTable from './components/FileTable/FileTable.vue'
import SmartBar from './components/SmartBar/SmartBar.vue'
import TopBar from './components/TopBar/TopBar.vue'
import UploadDialog from './components/UploadDialog/UploadDialog.vue'
import { reqRenameFile, reqRenameFolder, reqCreateFolder, reqRemoveFile, reqRemoveFolder } from '@/api'
import { nameValidator, validate } from '@/utils/validator'
import { SERVER_URL } from '@/api/server'

export default {
    components: {
        FileTable, SmartBar, TopBar, UploadDialog
    },
    computed: {
        selectedType() {
            return this.selectedItem ? this.selectedItem.type : null
        },
        ...mapState({
            files: state => state.file.list
        })
    },
    data: () => ({
        selectedItem: null,
        loading: null,

        folderDialog: false,
        renameDialog: false,
        removeDialog: false,
        uploadDialog: false,

        removeLoading: false,

        renameInput: '',
        renameInputError: false,
        renameInputErrorMsg: '',
        renameLoading: false,

        folderInput: '',
        folderInputError: false,
        folderInputErrorMsg: '',
        createFolderLoading: false,

        downloadRatio: 0,
        downloading: false,
        downloadFilename: '',
        downloadTaskXhr: null,

        audio: null
    }),
    async created() {
        try {
            await this.loadUserInfo()
            await this.$store.dispatch('getUsedCapacity')
            await this.loadData()
            this.audio = new Audio()
            this.audio.src = `${SERVER_URL}/sound/download_finish.mp3`
        } catch (error) {
            console.error(error)
        }
    },
    methods: {
        openFolder(item) {
            if (!item) {
                item = this.selectedItem
            }
            this.$store.commit('setLocation', {
                lid: item.fdid, name: item.name
            })
            this.clearSelected()
        },

        clearSelected() {
            this.selectedItem = null
        },

        download() {
            if (this.downloading) {
                this.errorNotification('The current task is not completed')
                return
            }
            const url = this.selectedItem.url
            const fileName = this.selectedItem.name
            this.downloading = true
            this.downloadFilename = fileName

            let x = new XMLHttpRequest();
            this.downloadTaskXhr = x;
            x.open("GET", url, true);
            x.responseType = 'blob';
            x.onload = function () {
                let url = window.URL.createObjectURL(x.response)
                let a = document.createElement('a');
                a.href = url
                a.download = fileName;
                a.click()
            }
            x.addEventListener("progress", ({ loaded, total }) => {
                this.downloadRatio = Math.floor((loaded / total) * 100);

                if (loaded == total) {
                    this.downloading = false
                    this.downloadRatio = 0
                    this.audio.play()
                    this.successNotification(`File download complete`)
                    this.downloadTaskXhr = null
                }
            })
            x.send();
        },

        abortDownload() {
            this.downloading = false
            this.downloadRatio = 0
            this.downloadTaskXhr.abort()
            this.downloadTaskXhr = null
        },

        copyUrl() {
            const url = this.selectedItem.url
            this.$copyText(url).then(() => {
                console.log("copy right:" + url)
                this.successNotification(`The link has been copied to the clipboard`)
            }, () => {
                console.error("copy error")
            })
        },

        async loadData() {
            this.loading = this.$vs.loading()
            try {
                this.clearSelected()
                // await this.$store.dispatch('getList')
            } catch (error) {
                this.$store.commit('cancelChange')
                console.error(error)
            } finally {
                await this.$store.dispatch('getList')
                this.loading.close()
            }
        },

        async loadUserInfo() {
            await this.$store.dispatch('getUserInfo')
            this.$store.commit('setRootLid', this.$store.state.user.info.root_id)
        },

        async handleRename() {
            const { type } = this.selectedItem
            if (type === 'folder') {
                this.rename(reqRenameFolder, { fdid: this.selectedItem.fdid, fdname: this.renameInput })
            }
            else {
                this.rename(reqRenameFile, { fid: this.selectedItem.fid, fname: this.renameInput })
            }
        },

        async rename(reqFn, params) {
            this.renameLoading = true
            try {
                if (!validate(nameValidator, this, this.renameInput, 'renameInput'))
                    throw 'Invalid input'
                await reqFn(params)
                this.renameDialog = false
                this.loadData()
            } catch (error) {
                console.error(error)
                this.errorNotification(error)
            } finally {
                this.renameLoading = false
            }
        },

        async removeItem() {
            const { type } = this.selectedItem
            if (type === 'folder') {
                this.remove(reqRemoveFolder, this.selectedItem.fdid)
            }
            else {
                this.remove(reqRemoveFile, this.selectedItem.fid)
            }
        },

        async remove(reqFn, id) {
            this.removeLoading = true
            try {
                await reqFn(id)
                this.loadData()
                this.$store.dispatch('getUsedCapacity')
            } catch (error) {
                console.error(error)
                this.errorNotification(error)
            } finally {
                this.removeDialog = false
                this.removeLoading = false
            }
        },

        async createFolder() {
            this.createFolderLoading = true
            try {
                if (!validate(nameValidator, this, this.folderInput, 'folderInput'))
                    throw 'Invalid input'
                await reqCreateFolder(this.folderInput)
                this.folderDialog = false
                this.loadData()
            } catch (error) {
                console.error(error)
                this.errorNotification(error)
            } finally {
                this.createFolderLoading = false
            }
        },

        errorNotification(text) {
            this.$vs.notification({
                icon: `<box-icon name='error-circle' color='white'></box-icon>`,
                duration: 4000,
                progress: "auto",
                color: "danger",
                position: "top-center",
                title: "Error",
                text: text
            });
        },
        successNotification(text) {
            this.$vs.notification({
                icon: `<box-icon name='select-multiple' color='white'></box-icon>`,
                color: 'success',
                position: 'top-center',
                // progress: 'auto',
                duration: 1800,
                title: 'Success',
                text: text
            })
        }
    },

    watch: {
        folderDialog(val) {
            if (!val) {
                this.folderInputError = false
                this.folderInputErrorMsg = ''
            }
        },
        renameDialog(val) {
            if (!val) {
                this.renameInputError = false
                this.renameInputErrorMsg = ''
            }
        },

        uploadDialog(val) {
            if (!val) {
                this.loadData()
                this.$store.dispatch('getUsedCapacity')
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
#home-view
    padding 28px

</style>