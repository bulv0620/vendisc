<template>
    <div class="pwd">
        <div class="container">
            <div class="pwd-form">
                <div class="back">
                    <router-link to="/user">
                        <box-icon name='arrow-back'></box-icon>
                    </router-link>
                </div>

                <h1 class="title mb">
                    Edit <b>Password</b>
                </h1>

                <MyInput class="mb" :value.sync="oldPwd" placeholder="Old Password" icon="lock-alt"
                    :error.sync="oldPwdError" :msg="oldPwdErrorMsg" type="password"></MyInput>

                <MyInput class="mb" :value.sync="newPwd" placeholder="New Password" icon="lock-alt"
                    :error.sync="newPwdError" :msg="newPwdErrorMsg" type="password"></MyInput>

                <vs-button block class="mb" @click="editPwd" :loading="loading">
                    Edit
                </vs-button>
            </div>
        </div>
    </div>
</template>

<script>
import { validate, editPwdValidator } from '@/utils/validator'
import { reqEditPassword } from '@/api'
export default {
    data: () => ({
        oldPwd: "",
        newPwd: "",
        loading: false,

        oldPwdError: false,
        newPwdError: false,
        oldPwdErrorMsg: '',
        newPwdErrorMsg: ''
    }),
    methods: {
        async editPwd() {
            try {
                this.loading = true
                if (!validate(editPwdValidator, this, this.oldPwd, this.newPwd))
                    throw 'Invalid input'
                await reqEditPassword({
                    oldPwd: this.oldPwd,
                    newPwd: this.newPwd
                })
                await this.$store.dispatch('userLogout')
                this.$router.push('/login')
            }
            catch (error) {
                console.error(error)

                if (error === 'Old password wrong, code: -26') {
                    this.oldPwdError = true
                    this.oldPwdErrorMsg = ''
                }

                this.$vs.notification({
                    icon: `<box-icon name='error-circle' color='white'></box-icon>`,
                    duration: 3000,
                    progress: "auto",
                    color: "danger",
                    position: "top-center",
                    title: "Error",
                    text: error
                });
            }
            finally {
                this.loading = false;
            }
        }
    },
}
</script>

<style lang="stylus" scoped>
.pwd
    padding 28px

    .container
        width 744px
        height 450px
        margin 0 auto
        padding-top 130px

        .pwd-form
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


</style>