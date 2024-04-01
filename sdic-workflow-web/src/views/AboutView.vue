<template>
  <div> 
    <div class="nav">
      <el-input v-model="searchInput" placeholder="请输入名称" clearable />
      <el-button :icon="Search" @click="search" type="primary" plain >搜索</el-button>
      <el-button :icon="Refresh" @click="refresh" plain>重置</el-button>
       <el-button @click="openDialog()" :icon="Plus" type="primary" style="float:right">新增</el-button>
    </div>
    <!-- 列表 -->
    <el-table class="customer-no-border-table" :data="tableData" style="width: 100%; background: '#bbb'" id="tableData">
      <el-table-column v-for="(item, index) in tableOptions" :key="index" :prop="item.prop" :label="item.label" :show-overflow-tooltip="true" :width="item.width">
        <template #default="scope">
          {{ scope.row[item.prop] }}
        </template>
      </el-table-column>
      <el-table-column v-slot="scope" fixed="right" width="275px" label="操作">
        <el-button @click="openDialog(scope.row)" size="small" :icon="Edit" color="#2CC09C" plain class="btn-bc">修改</el-button>
        <el-button @click="FabuList(scope.row)" size="small" :icon="Promotion" color="#4AA5E6" plain class="btn-bc">发布</el-button>
        <el-button @click="deleteList(scope.row)" size="small" :icon="Delete" color="#e73210" plain class="btn-bc">删除</el-button>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> 
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from 'vue'
import { Search, Refresh, Plus, Edit, Delete, Promotion } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import api from '@/config/api'; // 接口

// 模糊查询
  const searchInput = ref('')
  const search = () => {
    getList()
  }

  const tableOptions = [
    {
      label: '编号',
      prop: 'bh'
    },
    {
      label: '名称',
      prop: 'name'
    },
    {
      label: '版本',
      prop: 'version'
    },
    {
      label: '创建时间',
      prop: 'createTime'
    },
    {
      label: '最后时间',
      prop: 'endTime'
    }
  ]

  // 1.	查询接口list  并分页
  const total = ref(0)
  const page = reactive({
    pageNum: 1,//当前页
    pageSize: 10//每页条数
  })
  const tableData = ref([])

  const getList = () => {
    let data = {
      name: searchInput.value,
      pageNum: page.pageNum,
      pageSize: page.pageSize
    }
    tableData.value = []

    // productCategoryTable(data).then((res:any)=>{
    //   tableData.value = res.data.rows
    //   total.value = res.data.total
    // })
    tableData.value = [
      {
        bh:'111',
        name:'heiha',
        version:'1',
        createTime:'2024-01-02',
        endTime:'2024-01-23'
      },
      {
        bh:'122',
        name:'heiha222',
        version:'2',
        createTime:'2024-01-02',
        endTime:'2024-01-23'
      }
    ]
    total.value = 3

  }
  getList()//初始化页面列表


  const handleSizeChange = (val: number) => {
    page.pageSize = val
    getList()//初始化页面列表
  }
  const handleCurrentChange = (val: number) => {
    page.pageNum = val
    getList()//初始化页面列表
  }

  // 重置搜索条件 并刷新列表
  const refresh = () => {
    searchInput.value = ''
    page.pageSize = 10
    page.pageNum = 1
    getList()//初始化页面列表
  }

  // 2.发布
  const FabuList = (row)=>{
    console.log(row)
    console.log("fabu")
  }

  // 3.删除
  const deleteList =(row) => {
    ElMessageBox.confirm(
    '确定要删除此模型吗?',
    '',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      let params = {
        id:row.id
      }
      console.log("ccccc")
      // cplbDelete(params).then((res:any)=>{
      //   if(res.code == '200'){
      //     ElMessage({
      //       type: 'success',
      //       message: res.msg
      //     })
      //     getList()//初始化页面列表
      //   }else{
      //     ElMessage({
      //       type: 'error',
      //       message: res.msg
      //     })
      //     getList()//初始化页面列表
      //   }
      // })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消发布',
      })
    })
  }

  const router = useRouter()
  // 新增/修改弹窗
  const openDialog = (row?: any) => {
    if (row) {//修改
      console.log("修改")
      console.log(row)
      router.push({
        path: '/home',
        query: { row: JSON.stringify(row) }
      })
    }else{
      console.log("新增")
      router.push({
        path: '/home'
      })
    }
  }

</script>
<style scope> 
  .nav {
    margin-bottom: 16px; 
  } 
  .nav .el-input {
    max-width: 200px;
    margin: 0 10px 0 0;
  } 
  .customer-no-border-table {
    border: none;
    height: calc(100vh - 120px);
  }
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  } 
</style>