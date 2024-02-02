<template>
    <div class="user">
        <div class="container">
            <div class="user-panel">
                <div class="back">
                    <router-link to="/">
                        <box-icon name='arrow-back'></box-icon>
                    </router-link>
                </div>

                <h1 class="title mb">
                    Welcome <b>{{nickname}}</b>
                </h1>

                <div class="flex mb">
                    <WaveBall class="wave-ball" :rate="Number($store.getters.capacityRatio)" :bSize="120" fontSize="1.6rem" :waveColor="'#71eabe'"
                        :fontColor="'#02B875'"></WaveBall>
                </div>

                <div class="flex mb">
                    Capacity Ratio: &nbsp;
                    <div>{{calculateSize($store.state.file.usedCapacity)}} / {{calculateSize($store.getters.capacity)}}</div>
                </div>

                <vs-button block border class="mb" color="" @click="logout()" :loading="loading">
                    Logout
                </vs-button>

                <div class="new">
                    Change Password? <router-link to="/pwd">Click Here</router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import {calculateSize} from '@/utils/calc'

export default {
    data: () => ({
        loading: false,
    }),
    computed: {
        ...mapState({
            nickname: state => state.user.info?.uname
        })
    },
    methods: {
        calculateSize,
        async logout() {
            try {
                this.loading = true
                await this.$store.dispatch('userLogout')
                this.$router.push('/login')
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.user 
    padding 28px

    .container
        width 744px
        height 500px
        margin 0 auto
        padding-top 80px

        .user-panel
            background #fff
            border-radius 12px
            width 340px
            padding 18px
            text-align center
            font-size .9rem !important
            margin 0 auto
            box-shadow rgba(100, 100, 111, 0.2) 0px 2px 29px 0px;
            position relative

            .back
                position absolute
                top 21px
                cursor pointer

            .title 
                font-size 1.3rem
                color var(--vs-theme-code)
                padding 6px 0

                b 
                    font-weight bolder
            
            .mb
                margin-bottom 18px

            .mb2
                margin-bottom 8px

            .flex
                display flex
                align-items center
                justify-content center
            

</style>