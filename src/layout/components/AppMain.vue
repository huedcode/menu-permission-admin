<template>
    <section class="app-main" style="min-height: calc(100vh);">
        <router-view v-slot="{ Component }">
            <keep-alive :exclude="excludePage">
                <component class="view" :is="Component"/>
            </keep-alive>
        </router-view>
    </section>
</template>

<script>
    export default {
        name: 'AppMain',
        data() {
            return {
                // 不需要keep-alive的组件和页面
                excludePage:'About'
            }
        }
        ,
        computed: {
            cachedViews() {
                return this.$store.state.tagsView.cachedViews
            },
            key() {
                return this.$route.path
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app-main {
        /* 50= navbar  50  */
        /*min-height: calc(100vh - 50px);*/
        width: 100%;
        position: relative;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.3);
    }

    .fixed-header + .app-main {
        padding-top: 50px;
    }

    .hasTagsView {
        .app-main {
            /* 84 = navbar + tags-view = 50 + 34 */
            /*min-height: calc(100vh - 84px);*/
            min-height: calc(100vh);
        }

        .fixed-header + .app-main {
            padding-top: 84px;
        }
    }
</style>

<style lang="scss">
    // fix css style bug in open el-dialog
    .el-popup-parent--hidden {
        .fixed-header {
            padding-right: 15px;
        }
    }

    .el-menu-item [class^=el-icon-], .el-submenu [class^=el-icon-] {
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: left !important;
    }

    .move-enter-active,
    .move-leave-active {
        transition: opacity .5s;
    }

    .move-enter,
    .move-leave {
        opacity: 0;
    }
</style>
