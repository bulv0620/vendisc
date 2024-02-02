<template>
    <div class="top-bar">
        <vs-button disabled>
            <box-icon name='menu' color="white"></box-icon>
        </vs-button>

        <div class="breadcrumb">
            <ul>
                <li v-for="(item, i) in list" :key="i">
                    <a href="#" @click="changeLocation(i)" @drop="handleDrop(item.lid)" @dragover="handleDragover">{{item.name}}</a>
                    <span style="color: #ccc" v-if="i !== list.length - 1">&GT;</span>
                </li>
            </ul>
        </div>

        <WaveBall class="wave-ball" :rate="Number($store.getters.capacityRatio)" :bSize="40" fontSize=".9rem" :waveColor="'#71eabe'" :fontColor="'#02B875'"></WaveBall>
    </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
    computed: {
        ...mapState({
            list: state => state.location.list
        }),
        ...mapGetters(['isRoot', 'currentLocation'])
    },
    methods: {
        changeLocation(index) {
            this.$store.commit('changeLocation', index)
        },
        async handleDrop(lid) {
            console.log('drop:' + lid)
            this.$store.commit('setDropFolderId', lid)
            await this.$store.dispatch('moveFile')
            this.$emit('refresh')
        }, 
        handleDragover(e){
            e.preventDefault();
        }
    },
    watch:{
        currentLocation() {
            this.$emit('refresh')
        }
    }
}
</script>

<style lang="stylus" scoped>
    .top-bar
        position relative
        background var(--vs-light)
        padding 6px
        box-shadow rgba(100, 100, 111, 0.2) 0px 2px 29px 0px;
        border-radius 12px
        margin-bottom 28px
        display flex

        .breadcrumb
            line-height 50px
            padding-left 12px

            ul
                display flex
                cursor default

                li
                    margin-right 8px

                    a 
                        color var(--vs-theme-color)
                        margin-right 6px

                        &:hover 
                            color #5b3cc4


        .wave-ball 
            position absolute
            right 8px
            top 50%
            transform translateY(-50%)
            cursor pointer
</style>