<template>
  <div class="app-container">
      <el-card  v-loading="loading">
        <h2 style="margin-bottom: 20px">这个页面edit和admin都可以访问</h2>
        <el-button @click="getList">点击获取</el-button>
        <el-table
                :data="tableData"
                style="width: 100%">
          <el-table-column
                  prop="date"
                  label="日期"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="姓名"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="地址">
          </el-table-column>
        </el-table>
      </el-card>
  </div>
</template>

<script>
  import {ref,reactive} from 'vue'
  export default {
    name:'About',
    data(){
      return{
        loading:true
      }
    },
    created() {
      setTimeout(()=>{
        this.loading = false
      },1000)
    },
    setup(){
      let {tableData,getList}  = test()
      return {tableData,getList}
    },
  }

 function test(){
    let tableData = ref([])
    function getList(){
      tableData.value = [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
    return {tableData,getList}
  }
</script>
