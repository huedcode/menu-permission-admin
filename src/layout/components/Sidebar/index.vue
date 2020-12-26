<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        @select="handleSelect"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
         mode="vertical">
        <sidebar-item v-for="route in routers" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import {useStore} from 'vuex'
import {computed} from 'vue'
export default {
  components: { SidebarItem, Logo },
  data(){
    return{
      Menu:'/assembly'
    }
  },
  setup(){
    let store = useStore();
    let routers =  computed(() => store.state.permission.routers)
    return{
      routers
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),

    activeMenu() {
      // console.log('执行了。',this.$route)
      const route = this.$route
      const { meta, path } = route
      // 如果设置了path，侧边栏将突出显示设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    // console.log(' created',this.routers);
  },
  methods:{
    handleSelect(key,path){
      // this.$router.push({
      //   path:e
      // })
    }
  }
}
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
