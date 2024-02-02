<template>
    <div class="login">
        <div class="container">
            <div class="login-form">

                <h1 class="title mb">
                    Welcome to <b>Vendisc</b>
                </h1>

                <MyInput class="mb" :value.sync="username" placeholder="Username" icon="user"
                    :error.sync="usernameError" :msg="usernameErrorMsg" type="text"></MyInput>

                <MyInput class="mb" :value.sync="password" placeholder="Password" icon="lock-alt"
                    :error.sync="passwordError" :msg="passwordErrorMsg" type="password"></MyInput>

                <div class="flex mb">
                    <vs-checkbox v-model="remember">Remember me</vs-checkbox>
                    <div><router-link to="/retrieve">Forgot Password?</router-link></div>
                </div>

                <vs-button block class="mb" @click="login()" :loading="loading">
                    Sign In
                </vs-button>

                <div class="new">
                    New Here? <router-link to="/register">Create New Account</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { loginValidator, validate } from '@/utils/validator'
import { Base64 } from 'js-base64'
export default {
    data: () => ({
        username: "",
        password: "",
        remember: false,
        loading: false,

        usernameError: false,
        passwordError: false,

        usernameErrorMsg: '',
        passwordErrorMsg: '',
    }),
    mounted() {
        let data = localStorage.getItem('VENDISC_INFO')
        if(data) {
            data = JSON.parse(Base64.decode(data))
            this.username = data.username
            this.password = data.password
        }
    },
    methods: {
        async login() {
            try {
                this.loading = true;
                if (!validate(loginValidator, this, this.username, this.password)) {
                    throw "Invalid input"
                }
                await this.$store.dispatch("userLogin", {
                    username: this.username,
                    password: this.password
                });

                if(this.remember) {
                    const jsonStr = {
                        username: this.username,
                        password: this.password
                    }
                    const data = Base64.encode(JSON.stringify(jsonStr))
                    localStorage.setItem("VENDISC_INFO", data)
                }

                this.$router.push("/")
            }
            catch (error) {
                console.error(error)

                if (error === 'Incorrect username or password, code: -24') {
                    this.usernameError = true
                    this.passwordError = true
                    this.usernameErrorMsg = ''
                    this.passwordErrorMsg = ''
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
                this.loading = false
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.login 
    padding 28px

    .container
        width 744px
        height 500px
        margin 0 auto
        padding-top 80px

        .login-form
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

            .flex
                display flex
                align-items center
                justify-content space-between
            


</style>