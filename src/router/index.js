import {createRouter, createWebHistory,createWebHashHistory} from 'vue-router'
import Layout from '../layout'

// 不需要权限的路由
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('../views/login/login'),
        name: 'Login',
        hidden: true
    },
    {
        path:'/',
        name:'Home',
        redirect:'/page1',
        component: Layout,
        meta:{title:'主页',icon:'home'},
        children:[
            {
                path:'page1',
                name:'page1',
                component:  () => import('../views/page1'),
                meta:{title:'示例页面1',icon:'order'},
            },
            {
                path:'page2',
                name:'page2',
                component: () => import('../views/page2'),
                meta:{title:'示例页面2',icon:'sms-ad'},
            }
        ]
    },
]

// 需要权限的路由
export const asyncRoutes = [
    {
        path:'/about',
        name:'About',
        redirect:'/about/me',
        component: Layout,
        meta:{title:'xx',icon:'xx'}, //只有一个子路由的时候，这里随便填，因为不显示
        children:[
            {
                path:'me',
                name:'About',
                component: () => import('../views/About'),
                meta:{title:'关于我们',icon:'people'},
            }
        ]
    },
    {
        path:'/permission',
        name:'permission',
        redirect:'/permission/permission1',
        component: Layout,
        meta:{title:'xx',icon:'xx'},
        children:[
            {
                path:'permission1',
                name:'permission',
                component: () => import('../views/permission'),
                meta:{title:'权限页面',icon:'password'},
            }
        ]
    }
]


export const router = createRouter({
    // hash模式
    history: createWebHashHistory(process.env.BASE_URL),
    routes:constantRoutes
})




