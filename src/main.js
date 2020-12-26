import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './permission' // permission control
import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router'
import store from './store'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css'
import 'default-passive-events' //浏览器兼容
import '@/icons'
import SvgIcon from '@/components/SvgIcon'
createApp(App).
 use(store).
 use(router).
 use(ElementPlus,{ size: 'small', zIndex: 3000 }).component('svg-icon',SvgIcon)
    .mount('#app')
