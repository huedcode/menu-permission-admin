import {
    asyncRoutes,
    constantRoutes,
} from '../../router'
import {toRaw} from  'vue'
// import('../../router').then(res=>{
//     state.routes = res.constantRoutes
// })

/**
 * 前端控制路由（权限筛选）
 * lzz
 * @param roles
 * @param route
 */
//判断是否有权限访问该菜单
function hasPermission(menus, route) {
    // 只对存在name属性的路由进行判断
    if (route.name) {
        let currMenu = getMenu(route.name, menus);
        if (currMenu != null) {
            //设置菜单的标题、图标和可见性
            if (currMenu.title != null && currMenu.title !== '' && currMenu.title !== undefined) {
                // console.log(currMenu)
                route.meta.title = currMenu.title;
            }
            if (currMenu.icon != null && currMenu.title !== '') {
                route.meta.icon = currMenu.icon;
            }
            if (currMenu.hidden != null) {
                route.hidden = currMenu.hidden !== 0;
            }
            if (currMenu.sort != null && currMenu.sort !== '') {
                route.sort = currMenu.sort;
            }
            return true;
        } else {
            route.sort = 0;
            if (route.hidden !== undefined && route.hidden === true) {
                return true;
            } else {
                return false;
            }
        }
    } else {
        return true
    }
}

//根据路由名称获取菜单
function getMenu(name, menus) {
    for (let i = 0; i < menus.length; i++) {
        let menu = menus[i];
        // 后端存储的name 要跟前端的 name 严格一致，否则将会无法识别
        if (name === menu.name) {
            return menu;
        }
    }
    return null;
}

//对菜单进行排序
function sortRouters(accessedRouters) {
    for (let i = 0; i < accessedRouters.length; i++) {
        let router = accessedRouters[i];
        if (router.children && router.children.length > 0) {
            router.children.sort(compare("sort"));
        }
    }
    accessedRouters.sort(compare("sort"));
}

//降序比较函数
function compare(p) {
    return function (m, n) {
        let a = m[p];
        let b = n[p];
        return b - a;
    }
}

// 筛选没有子路由的目录(parentId为0的)
function filterCatalog(menus, currMenu) {
    if (typeof menus != 'object') {
        return false;
    } else {
        let parentRouterId = '';
        let routerNum = 0;
        for (let i = 0; i < menus.length; i++) {
            if (menus[i].name == currMenu.name) {
                // console.log(menus[i].id)
                parentRouterId = menus[i].id
            }
        }
        for (let i = 0; i < menus.length; i++) {
            if (menus[i].parentId == parentRouterId) {
                routerNum += 1;
            }
        }
        // 如果routerNum>1代表该目录下的子路由有东西
        return routerNum > 0 ? true : false
    }
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTERS: (state, routers) => {
        state.addRouters = routers;
        state.routers = constantRoutes.concat(routers)
        // console.log('state.routers',routers)
    }
}

const actions = {
    GenerateRoutes({commit}, data) {
        return new Promise(resolve => {
            const {menus} = data;
            const accessedRouters = asyncRoutes.filter(v => {
                // menus 为后端返回的路由表。v为本地写死的路由表
                // 这里我做了个改动，本来是没有filterCatalog(menus, v) ，因为如果目录下没有路由的话，会造成没页面跳转的情况
                // 作用是让没有子路由的目录隐藏
                if (hasPermission(menus, v)) {
                    if (v.children && v.children.length > 0) {
                        v.children = v.children.filter(child => {
                            if (hasPermission(menus, child)) {
                                return child
                            }
                            return false;
                        });
                        return v
                    } else {
                        return v;
                    }
                }
                return false;
            });
            // console.log('accessedRouters',accessedRouters)
            // debugger
            //对菜单进行排序
            sortRouters(accessedRouters);
            commit('SET_ROUTERS', accessedRouters);
            resolve(accessedRouters);
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
