import {constantRoutes, router} from './router'
import {isNavigationFailure} from 'vue-router'
import store from './store'
import {ElMessage} from 'element-plus'
import {getToken} from '@/utils/auth' // 获取登录用户信息
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {createRouterMatcher,RouteRecordRaw} from 'vue-router'
// 进度条
NProgress.configure({showSpinner: false})

// 不登录都可以访问的路由
const whiteList = ['/login', '/auth-redirect']

// router4.0前置守卫中使用next()会报警告，如果强行使用甚至会出现其他问题，手动调用router.push或者return true/false 代替。
router.beforeEach(async (to) => {
    // 开启进度条
    NProgress.start()
    const hasToken = getToken()
    //已登陆的情况
    if (hasToken) {
        // 如果在已登陆的情况下去登录页，就阻止，避免重复登录
        if (to.path === '/login') {
            NProgress.done()
            await router.push({ path:'/', replace: true })
            return false;
        } else {
            // 如果不是登录页,再进一步判断是否登录过期
            if (store.state.user.name) {
                return true;
            } else {
                try {
                    let {menus} = await store.dispatch('user/getInfo')
                    let accessedRouters = await store.dispatch('permission/GenerateRoutes', {menus})
                    await getRoutes(accessedRouters)
                    await router.push({ ...to, replace: true })
                    return true;
                } catch (e) {
                    console.log(e)
                    ElMessage.error({
                        message:'出错了~'
                    })
                }
            }
        }
    } else {
        // 如果没有登录，看看该路由是否在白名单里
        if (whiteList.indexOf(to.path) !== -1) {
            return true;
        } else {
           await router.push({
                path: '/login',
                query: {redirect: to.fullPath},
                replace: true
            })
            NProgress.done()
            return false

        }
    }
})

// router4.0取消了addRouters方法，只能遍历使用addRoute方法了
function getRoutes(routes) {
    routes.forEach(parentRoute => {
        router.addRoute(parentRoute)
        if (parentRoute.children && parentRoute.children.length > 0) {
            for (let i = 0; i < parentRoute.children.length; i++) {
                router.addRoute(parentRoute.name, parentRoute.children[i])
            }
        }
    })
}

router.afterEach((to, from, failure) => {
    if (isNavigationFailure(failure)) {
        // console.log('failed navigation', failure)
    }
    NProgress.done() // finish progress bar
})

router.onError(error => {
    console.log(error, '路由错误')
})
