<template>
    <div class="retrieve">
        <div class="container">
            <div class="retrieve-form">
                <h1 class="title mb">
                    Retrieve <b>Password</b>
                </h1>

                <MyInput class="mb" :value.sync="email" placeholder="Email" icon="envelope"
                    :error.sync="emailError" :msg="emailErrorMsg" type="email"></MyInput>

                <vs-button block class="mb" @click="retrievePwd" :loading="loading">
                    Send
                </vs-button>

                <div class="new">
                    Remember the Password? <router-link to="/login">Login now</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {validate, emailValidator} from '@/utils/validator' 
import { reqRetrievePwd } from '@/api'
export default {
    data: () => ({
        email: '',
        loading: false,

        emailError: false,
        emailErrorMsg: ''
    }),
    mounted() {
        this.showDialog = true
    },
    methods: {
        async retrievePwd() {
            try {
                this.loading = true
                if(!validate(emailValidator, this, this.email))
                    throw 'Invalid input'

                const { msg } = await reqRetrievePwd(this.email)

                this.$vs.notification({
                    position: "top-center",
                    duration: 10000,
                    color: "success",
                    progress: "auto",
                    title: 'Attention',
                    text: msg
                })

                this.$router.push('/login')
            } catch (error) {
                console.error(error)

                this.$vs.notification({
                    icon: `<box-icon name='error-circle' color='white'></box-icon>`,
                    duration: 3000,
                    progress: "auto",
                    color: "danger",
                    position: "top-center",
                    title: "Error",
                    text: error
                });
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style lang="stylus">
.retrieve
    padding 28px

    .container
        width 744px
        height 450px
        margin 0 auto
        padding-top 130px

        .retrieve-form
            background #fff
            border-radius 12px
            width 340px
            padding 18px
            text-align center
            font-size .9rem !important
            margin 0 auto
            box-shadow rgba(100, 100, 111, 0.2) 0px 2px 29px 0px;

            .title 
                font-size 1.3rem
                color var(--vs-theme-code)
                padding 6px 0

                b 
                    font-weight bolder
            
            .mb
                margin-bottom 18px

    .not-margin
        margin 0px
        font-weight normal
        padding 10px
        font-size 1.2rem
        font-weight bolder

    .con-content
        width 100%
        p
            font-size 1.1rem
            padding 0 10px
            .vs-checkbox-label
                font-size .8rem
            .vs-input-parent
                width 100%
            .vs-input-content
                margin 10px 0px
                width calc(100%)
            .vs-input
                width 100%
</style>