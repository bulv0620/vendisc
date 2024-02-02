<template>
    <div class="smart-bar">
        <div class="btn-container" key="btn-container">
            <transition-group name="fade">
                <BarButton key="user" @click.native="$router.push('/user')" color="skype" type="solid" icon="user"
                    tip="View personal page"></BarButton>

                <BarButton key="home" @click.native="$store.commit('backRoot')" v-if="!isRoot" color="reddit"
                    type="solid" icon="home" tip="Back to homepage"></BarButton>

                <BarButton key="back" v-if="!isRoot" @click.native="$store.dispatch('backToPervPage')" color="discord"
                    type="solid" icon="chevron-left-circle" tip="Back to previous page"></BarButton>


                <ColDivider key="divider1"></ColDivider>

                <BarButton @click.native="$emit('handleUploadFile')" key="upload" color="defalut" type="solid"
                    icon="cloud-upload" tip="Upload file"></BarButton>

                <BarButton @click.native="$emit('handleCreateFolder')" key="folder" color="amazon" type="solid"
                    icon="folder-plus" tip="Create folder"></BarButton>

                <BarButton @click.native="$emit('refresh')" key="refresh" color="google-plus" icon="refresh"
                    tip="Refresh"></BarButton>

                <template v-if="selectedType">
                    <ColDivider key="divider2"></ColDivider>

                    <template v-if="selectedType !== 'folder'">

                        <BarButton @click.native="$emit('handleDownload')" key="download" color="medium" type="solid"
                            icon="cloud-download" tip="Download file">
                        </BarButton>

                        <BarButton @click.native="$emit('handleCopyUrl')" key="copy" color="messenger" type="solid"
                            icon="copy" tip="Copy file url">
                        </BarButton>
                    </template>

                    <BarButton @click.native="$emit('openFolder')" key="open" v-if="selectedType === 'folder'"
                        color="messenger" type="solid" icon="folder-open" tip="Open folder"></BarButton>

                    <BarButton @click.native="$emit('handleRename')" key="rename" color="dribbble" type="solid"
                        icon="rename" tip="Rename item"></BarButton>

                    <BarButton @click.native="$emit('handleDelete')" key="delete" color="youtube" type="solid"
                        icon="trash" tip="Delete item"></BarButton>

                    <vs-button key="close" circle icon transparent @click="$emit('clear')">
                        <box-icon name='chevron-left' color="#ccc"></box-icon>
                    </vs-button>
                </template>
            </transition-group>
        </div>
        <transition name="change">
            <div class="download-box" v-if="downloading" key="downlaod-box">
                <div class="close-btn" @click="abortTask">
                    <box-icon name='x' color="#999"></box-icon>
                </div>

                <div class="download-container">
                    <vs-tooltip>
                        <span>{{`${shortCutString(downloadFilename)} - ${downloadRatio}%`}}</span>
                        <template #tooltip>
                            {{downloadFilename}}
                        </template>
                    </vs-tooltip>
                    <div class="progress-container">
                        <MyProgress :ratio="downloadRatio"></MyProgress>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BarButton from './components/BarButton.vue'
export default {
    props: ["selectedType", "backActive", 'downloading', 'downloadRatio', 'downloadFilename'],
    components: { BarButton },
    computed: {
        ...mapGetters(['isRoot'])
    },
    methods: {
        shortCutString(str) {
            if (str.length >= 8) {
                let splitName = str.split('.');
                return splitName[0].substring(0, 4) + "... ." + (splitName[1] || '');
            }
            return str
        },
        abortTask() {
            this.$emit('abortTask')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .smart-bar
        position relative
        display flex
        justify-content center
        
        .download-box
            padding-left 20px
            position relative
            
            .close-btn 
                position absolute
                right 16px
                top 6px
                cursor pointer
            .download-container
                margin-right 8px
                padding 6px
                padding-top 14px
                height 42px
                width 200px
                background var(--vs-light)
                box-shadow rgba(100, 100, 111, 0.2) 0px 2px 29px 0px;
                border-radius 12px
                color var(--vs-theme-code)
                text-align center
                white-space nowrap
                overflow hidden
                &:hover
                    overflow visible

                .progress-container
                    width 100%
                    padding 10px 0
                    width 100%
        
        .btn-container
            padding 6px
            display flex
            background var(--vs-light)
            box-shadow rgba(100, 100, 111, 0.2) 0px 2px 29px 0px;
            border-radius 12px

            span
                display flex

            .fade-enter-active 
                transition all .5s ease

            .fade-leave-active 
                display none

            .fade-enter
                opacity 0
                transform translateY(12px)


        .change-enter-active
            transition all .5s ease
        .change-leave-active 
            display none
        .change-enter, .change-leave-to
            opacity 0
            transform: translateX(50px)
</style>