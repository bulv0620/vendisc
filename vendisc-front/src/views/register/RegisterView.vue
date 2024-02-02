<template>
    <div class="register">
        <div class="container">
            <div class="register-form">
                <h1 class="title mb">
                    Welcome to <b>Vendisc</b>
                </h1>

                <MyInput class="mb" :value.sync="username" placeholder="Username" icon="user" :error.sync="usernameError" :msg="usernameErrorMsg"></MyInput>

                <MyInput type="password" class="mb" :value.sync="password" placeholder="Password" icon="lock-alt" :error.sync="passwordError" :msg="passwordErrorMsg"></MyInput>

                <MyInput type="password" class="mb" :value.sync="password2" placeholder="Confirm Password" icon="lock-alt" :error.sync="password2Error" :msg="password2ErrorMsg"></MyInput>

                <MyInput class="mb" :value.sync="uname" placeholder="Nickname" icon="palette" :error.sync="unameError" :msg="unameErrorMsg"></MyInput>

                <MyInput class="mb" :value.sync="email" placeholder="Email" icon="envelope" :error.sync="emailError" :msg="emailErrorMsg"></MyInput>

                <vs-button block class="mb" @click="register" :loading="loading">
                    Sign Up
                </vs-button>

                <div class="new">
                    Already Hava an Acount? <router-link to="/login">Login now</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reqUserRegister } from '@/api'
import { registerValidator, validate } from '@/utils/validator'
export default {
    data: () => ({
        username: "",
        password: "",
        password2: "",
        uname: "",
        email: "",
        loading: false,

        usernameError: false,
        passwordError: false,
        password2Error: false,
        unameError: false,
        emailError: false,

        usernameErrorMsg: "",
        passwordErrorMsg: "",
        password2ErrorMsg: "",
        unameErrorMsg: "",
        emailErrorMsg: "",
    }),
    methods: {
        async register() {
            try {
                this.loading = true;
                const user = {
                    username: this.username,
                    password: this.password,
                    password2: this.password2,
                    uname: this.uname,
                    email: this.email
                }
                if (!validate(registerValidator, this, user))
                    throw "Invalid input"
                await reqUserRegister(user)
                this.$router.push("/login")
            }
            catch (error) {
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
            }
            finally {
                this.loading = false;
            }
        },

    }
}
</script>

<style lang="stylus" scoped>
.register 
    padding 28px

    .container
        width 744px
        height 550px
        margin 0 auto
        padding-top 30px

        .register-form
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


</style>