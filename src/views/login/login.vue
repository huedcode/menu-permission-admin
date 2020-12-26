<template>
    <div class="login-container bg">
        <transition name="fade">
            <el-form ref="loginForm" v-if="show" :model="loginForm" class="login-form"
                     autocomplete="on" label-position="left">
                <div class="title-container">
                    <h3 class="title" style="margin-top: 15px;color:#324157 ">{{title}}</h3>
                </div>
                <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
                    <el-input
                            v-model="account"
                            placeholder="admin/edit"
                            name="account"
                            type="text"
                            tabindex="1"
                            autocomplete="on"
                    />
                </el-form-item>
                <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
                    <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password"/>
          </span>
                        <el-input
                                :key="passwordType"
                                v-model="pwd"
                                :type="passwordType"
                                placeholder="123456"
                                name="pwd"
                                tabindex="2"
                                autocomplete="on"
                                @keyup.native="checkCapslock"
                                @blur="capsTooltip = false"
                                @keyup.enter.native="handleLogin"
                        />
                        <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
          </span>
                    </el-form-item>
                </el-tooltip>

                <el-button class="pan-btn blue-btn"
                           :loading="loading"
                           type="primary"
                           style="width:100%;margin-bottom:30px;"
                           @click.native.prevent="login">登录
                </el-button>
            </el-form>
        </transition>
    </div>
</template>

<script>
    import {reactive, ref,watch,watchEffect} from 'vue'
    import {useRouter,useRoute} from "vue-router";
    import {useStore} from 'vuex'
    import {ElMessage} from 'element-plus'


    export default {
        setup() {
            let redirect = undefined;
            let query = ''
            const route = useRoute()

            // 登录逻辑
            let loginData = handleLogin(redirect,query)

            watch(route, (oldValue, newValue) => {
                let newQuery = newValue.query
                query = getOtherQuery(newQuery)
            })
            return {
                ...loginData
            }
        },
        name: 'Login',
        data() {
            return {
                show: false,
                passwordType: 'password',
                capsTooltip: false,
                otherQuery: {},
                title: process.env.VUE_APP_BASE_TITLE || '登录',
            }
        },

        created() {
            setTimeout(() => {
                this.show = true
            }, 500)
        },

        methods: {
            checkCapslock(e) {
                const {key} = e
                this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
        }
    }

    const  getOtherQuery = (query) => {
        return Object.keys(query).reduce((acc, cur) => {
            if (cur !== 'redirect') {
                acc[cur] = query[cur]
            }
            return acc
        }, {})
    }
    const handleLogin = (redirect,query) => {
        let _redirect = redirect;
        let _query = query;
        const loading = ref(false)
        let account = ref('')
        let pwd = ref('')
        const store = useStore()
        const router = useRouter()

        function login() {
            if (account.value === '' || pwd.value === '') {
                ElMessage({
                    message: '请输入账号和密码',
                    type: 'warning'
                })
                return;
            }
            loading.value = true
            store.dispatch('user/login', {account:account.value,pwd:pwd.value})
                .then(() => {
                    router.push({path: _redirect || '/', query: _query})
                    loading.value = false
                })
                .catch(() => {
                    loading.value = false
                })
        }
        return {loading,login,account,pwd}
    }
</script>
<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }
</style>
<style lang="scss">
    $bg: #283443;
    $light_gray: #fff;
    $cursor: #000;
    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

    html {
        background-image: url('../../assets/bg.png');
        background-repeat: repeat;
        background-size: 300px 300px;
    }

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $cursor;
                height: 47px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px #fff inset !important;
                    -webkit-text-fill-color: #000 !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid #eee;
            background: #fff;
            border-radius: 5px;
            color: #000;
        }
    }
</style>

<style lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #000;

    .login-container {
        min-height: 100%;
        width: 100%;

        background-size: cover;
        overflow: hidden;

        .login-form {
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.8);
            width: 520px;
            max-width: 100%;
            overflow: hidden;
            padding: 0 35px;
            margin: 0 auto;
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            left: 10%;
        }

        .tips {
            font-size: 14px;
            color: #000;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }

        .thirdparty-button {
            position: absolute;
            right: 0;
            bottom: 6px;
        }

        @media only screen and (max-width: 470px) {
            .thirdparty-button {
                display: none;
            }
        }
    }
</style>
