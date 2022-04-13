<template>
  <div class="container">
    <el-table :data="tableData" style="width: 95%; margin: 0 10px;">
      <el-table-column label="预约讲座" prop="lectureinfo" />
      <el-table-column label="教室" prop="classroomname" />
      <el-table-column label="日期" prop="date" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
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
          <el-button type="primary" @click="del(info)">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { SelectLecture, DeleteLecture, ModifyRole } from '../views/service'
import { ElMessageBox } from 'element-plus'

let tableData = ref([])
const dialogVisible = ref(false)
const info = ref("")

onMounted(() => {
  selectlect()
})

const selectlect = () => {
  SelectLecture().then((res) => {
    tableData.value = res.data
  })
}

// 删除按钮
const handleDelete = (index, row) => {
  dialogVisible.value = true
  info.value = row.lectureinfo
}
// 删除方法
const del = (lectureinfo) => {
  dialogVisible.value = false
  DeleteLecture(lectureinfo).then((res) => {
    selectlect()
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
  height: 90vh;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>