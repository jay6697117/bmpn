<template>
  <router-view/>
</template>

<style>
/* 统一更改列表样式 */
  .el-table th {
    color: rgb(48, 48, 48) !important;
    background: rgb(245, 247, 250) !important;
    height: 60px !important;
    font-size: 14px !important;
  }
  .el-table {
    color: #303030 !important;
  }
  /* 统一更改表格内操作按钮样式 背景色白色 */
  .btn-bc {
    background-color: #fff !important;
    &:hover {
      background-color: var(--el-button-hover-bg-color) !important;
    }
    &:focus {
      color: var(--el-button-hover-text-color) !important;
      background-color: var(--el-button-hover-bg-color) !important;
    }
    &:active {
      background-color: var(--el-button-hover-bg-color) !important;
    }
  }
  .el-button--small {
    padding: 5px 8px !important;
  }
  .nav .el-button {
    margin-right: 0px !important;
    padding: 8px 10px !important;
  }
  .el-input + .el-button {
    margin-left: 0px !important;
  }
</style>
