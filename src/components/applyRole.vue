<template>
  <div class="container">
    <el-table :data="tableData" style="width: 98%; margin: 0 10px;" :row-class-name="tableRowClassName">
      <el-table-column label="账号" prop="name" />
      <el-table-column label="请求权限" prop="role" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button size="small" type="success" @click="handleDelete(scope.$index, scope.row)">同意</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" width="30%" :before-close="handleClose">
      <span>确认预约讲座吗?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="del(classroom, info)">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { queryApply, ModifyRole, deleteApply } from '../views/service';
import { ElMessageBox, ElMessage } from 'element-plus';
import LocalStorage from "../utils/store"

const tableRowClassName = ({
  row,
  rowIndex,
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

let tableData = ref([])
const dialogVisible = ref(false)
const info = ref("")
const classroom = ref("")
const date = ref("")
const Username = ref("")
const role = ref("")
Username.value = LocalStorage.getLocalstore("studentInfo").name

role.value = LocalStorage.getLocalstore("studentInfo").role === "admin" ? true : false
onMounted(() => {
  console.log("name", Username.value);
  selectlect()
})

const selectlect = () => {
  queryApply().then((res) => {
    tableData.value = res.data
  })
}
// 删除按钮
const handleDelete = (index, row) => {
  if (role.value) {
    dialogVisible.value = true
    classroom.value = row.name
    info.value = row.role
  } else {
    ElMessage.warning("通知管理员添加权限");
  }
}
// 删除方法
const del = (userName, role) => {
  dialogVisible.value = false
  ModifyRole(userName, role).then((res) => {
    ElMessage.success("修改成功");
    selectlect()
  }).catch(() => {
    ElMessage.error("修改失败");
  })
  deleteApply(userName)
  selectlect()
}
// 确认关闭按钮
const handleClose = (done) => {
  ElMessageBox.confirm('取消本次删除吗?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  top: 70px;
  width: 100%;
  height: 90vh;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>