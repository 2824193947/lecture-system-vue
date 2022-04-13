<template>
  <div class="container">
    <el-table :data="tableData" style="width: 95%; margin: 0 10px;">
      <el-table-column label="用户名" prop="name" />
      <el-table-column label="权限" prop="role" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            plain
            @click="handleEditor(scope.$index, scope.row)"
          >Editor</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            plain
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" width="30%" :before-close="handleClose">
      <span>确认删除讲座吗?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="del(name)">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible1" width="30%" :before-close="handleClose1">
      <div style="margin-bottom: 10px;">修改用户角色</div>
       <el-select v-model="role" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        ></el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">Cancel</el-button>
          <el-button type="primary" @click="editor(name, role)">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { SelectUser, deleteUser, ModifyRole } from '../views/service'
import { ElMessageBox, ElMessage } from 'element-plus'

let tableData = ref([])
const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
const name = ref("")
const role = ref("studect")
const options = [
  {
    value: 'admin',
    label: '管理员',
  },
  {
    value: 'student',
    label: '学员',
  },
]
onMounted(() => {
  selectlect()
})

const selectlect = () => {
  SelectUser().then((res) => {
    console.log("🚀 ~ res", res.data)
    tableData.value = res.data
  })
}

// 删除按钮
const handleDelete = (index, row) => {
  dialogVisible.value = true
  name.value = row.name
}
const handleEditor = (index, row) => {
  dialogVisible1.value = true
  name.value = row.name
}
// 删除方法
const del = (userName) => {
  dialogVisible.value = false
  deleteUser(userName).then((res) => {
    ElMessage.success("删除成功");
    selectlect()
  }).catch(() => {
    ElMessage.error("删除失败");
  })
}
const editor = (userName, role) => {
  dialogVisible1.value = false
  ModifyRole(userName, role).then((res) => {
    ElMessage.success("修改成功");
    selectlect()
  }).catch(() => {
    ElMessage.error("修改失败");
  })
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
  height: 100vh;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>