<template>
  <div class="container">
    <el-table :data="tableData" style="width: 98%; margin: 0 10px;" :row-class-name="tableRowClassName">
      <el-table-column label="预约讲座" prop="lectureinfo" />
      <el-table-column label="教室" prop="classroomname" />
      <el-table-column label="日期" prop="date" />
      <el-table-column align="right">
        <template #default="scope">
          <el-button size="small" type="success" @click="handleDelete(scope.$index, scope.row)">预约</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" width="30%" :before-close="handleClose">
      <span>确认预约讲座吗?</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="del(Username, classroom, info, date, 0)">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { SelectLecture, AddAppointment } from '../views/service';
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
const store = useStore()
Username.value = store.state.studentdata.name

role.value = LocalStorage.getLocalstore("studentInfo").role === "admin" ? true : false
onMounted(() => {
  console.log("name", Username.value);
  selectlect()
})

const selectlect = () => {
  SelectLecture().then((res) => {
    tableData.value = res.data
  })
}
// 删除按钮
const handleDelete = (index, row) => {
  if (role.value) {
    dialogVisible.value = true
    classroom.value = row.classroomname
    info.value = row.lectureinfo
    date.value = row.date
  } else {
    ElMessage.warning("通知管理员添加权限");
  }
}
// 删除方法
const del = (name, classroomname, lectureinfo, date, sign) => {
  dialogVisible.value = false
  AddAppointment(name, classroomname, lectureinfo, date, sign).then((res) => {
    if (res.data === "预约成功") {
      ElMessage.success("预约成功");
    } else if (res.data === "已预约") {
      ElMessage.warning("已预约");
    } else {
      ElMessage.error("预约失败");
    }
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

.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>