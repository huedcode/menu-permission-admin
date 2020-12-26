import {ref, reactive, toRefs} from 'vue'
import {adminRouteList,editRouteList} from '../json'
import {setToken, removeToken,getToken} from '../../utils/auth'
import {apiLogin} from "../../api/user";
import {ElMessage} from "element-plus";
import {router} from "../../router";

const state = reactive({
    token: getToken(),
    name: '', //根据name来判断是否重新拿路由
    avatar: '',
    menus: []
})

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
}
const actions = {
    async login({commit}, loginForm = {}) {
        try {
            let {token} = await apiLogin(loginForm);
            commit('SET_TOKEN', token)
            setToken(token)
            return Promise.resolve()
        }catch (e) {
            ElMessage.error({
                message:e
            })
            return Promise.reject()
        }

    },
    // 假装获取个人信息
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 该用户拥有的路由
                let routeList = []
                if(state.token === 'lzz-token'){
                    routeList = adminRouteList
                    // 执行了这个方法才会产生name，没有name的话，才会重新请求路由表，解决登录后不刷新路由的问题
                    commit('SET_NAME', 'admin')
                    commit('SET_AVATAR', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg')
                }
                else if(state.token === 'edit-token'){
                    routeList = editRouteList
                    // 执行了这个方法才会产生name，没有name的话，才会重新请求路由表，解决登录后不刷新路由的问题
                    commit('SET_NAME', 'edit')
                    commit('SET_AVATAR', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3649178992,1821853682&fm=26&gp=0.jpg')
                }else{
                    reject();
                }
                resolve({menus: routeList})
            }, 500)
        })
    },
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('SET_TOKEN', '')
                removeToken()
                commit('SET_NAME', '')
                resolve()
            }, 300)
        })
    }
}

export default {
    namespaced: true, //用于在全局引用此文件里的方法时标识这一个的文件名,解决命名冲突问题
    state,
    mutations,
    actions
}
