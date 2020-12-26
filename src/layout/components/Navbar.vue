<template>
    <div class="navbar">
        <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
                   @toggleClick="toggleSideBar"/>

        <breadcrumb id="breadcrumb-container" class="breadcrumb-container"/>

        <div class="right-box">
            <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
                <screenfull id="screenfull" class="right-menu-item hover-effect"/>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="设置" placement="bottom">
                <i class="el-icon-setting" style="transform: scale(1.1)" @click="openSetting"></i>
            </el-tooltip>
            <div class="right-btn">
                <el-dropdown>
        <span class="el-dropdown-link" style="display: flex;align-items: center">
         <img class="avatar"
              :src="avatar">
          {{name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <i class="el-icon-user"></i>
                                个人中心
                            </el-dropdown-item>
                            <el-dropdown-item divided @click="logout">
                                <i class="el-icon-switch-button"></i>
                                退出登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters,useStore} from 'vuex'
    import Breadcrumb from '@/components/Breadcrumb'
    import Hamburger from '@/components/Hamburger'
    import ErrorLog from '@/components/ErrorLog'
    import Screenfull from '../../components/Screenfull'
    import SizeSelect from '@/components/SizeSelect'
    import SvgIcon from "../../components/SvgIcon/index";
    // import Search from '@/components/HeaderSearch'
    import {computed,} from 'vue';
    export default {
        setup() {
            let store = useStore();
            let avatar = computed(()=>store.state.user.avatar)
            let name = computed(()=>store.state.user.name)
            let routers = computed(()=>store.state.permission.routers)
            return{
                avatar,
                name,
                routers
            }
        },
        components: {
            SvgIcon,
            Breadcrumb,
            Hamburger,
            ErrorLog,
            Screenfull,
            SizeSelect,
            // Search,
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'device'
            ])
        },
        data() {
            return {
                DialogVisible: {
                    show: false
                },
                bindVisible: {
                    show: false
                }
            }
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('app/toggleSideBar')
            },
            async logout() {
                await this.$store.dispatch('user/logout')
                // await this.$store.dispatch('tagsView/delAllViews')
                this.$router.push({
                    path: '/login',
                    replace: true
                })
            },
            resetPwd() {
                this.DialogVisible.show = true
            },
            openSetting() {
                this.$store.commit('settings/CHANGE_Panel', true)
            }

        }
    }
</script>
<style>
    .right-box {
        cursor: pointer;
        float: right;
        min-width: 250px;
        height: 100%;
        /*border: 1px dashed #4AB7BD;*/
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
    }

    .right-box .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
        box-shadow: 0 0 5px #eeeeee;
    }
</style>
<style lang="scss" scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;
            width: 300px;
            /*background-color: #42b983;*/
            &:focus {
                outline: none;
            }

            .right-menu-item {
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                display: flex;
                align-items: center;
                vertical-align: text-bottom;
                width: 50px;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {
                margin-right: 30px;

                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
