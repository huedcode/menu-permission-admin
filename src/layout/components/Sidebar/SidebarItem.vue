<template>
  <!-- 如果子路由只有一个或者没有子路由，就走这里-->
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}" @click.native="handleRouteClick(item)" >
          <item :isOne="item.children && item.children.length < 2? true:false" :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 如果子路由有一个以上，就走这里-->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body >
      <template #title>
          <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>

      <sidebar-item
        v-for="child in item.children"
        :index="child.path"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import SidebarItem from './SidebarItem'
import {useRoute,useRouter} from 'vue-router'
export default {
  name: 'SidebarItem',
  components: { Item, AppLink,SidebarItem },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  created() {
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  setup(){
    const router = useRouter();

    function handleRouteClick(item){
      router.push({
        name:item.name
      })
    }
    return {
      handleRouteClick
    }
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      // console.log(children)
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(只有一个显示子节点时使用)
          this.onlyOneChild = item
          return true
        }
      })

      // 当只有一个子路由器时，默认显示子路由器
      if (showingChildren.length === 1) {
        return true
      }

      // 如果没有子路由器显示，则显示父路由器
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    },

  }
}
</script>
