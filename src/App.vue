<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component class="view" :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>


<style>
  /*.el-menu--collapse{*/
  /*  width: 100% !important;*/
  /*  padding-left: 13px !important;*/
  /*}*/
</style>
