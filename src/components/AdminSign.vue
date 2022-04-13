<template>
    <div class="container">
        <el-select v-model="Username" placeholder="Select">
            <el-option
                v-for="item in options"
                :key="item.name"
                :label="item.label"
                :value="item.name"
                :disabled="item.disabled"
            ></el-option>
        </el-select>
        <el-table :data="tableData" style="width: 95%; margin: 0 10px;">
            <el-table-column label="用户名" prop="name" />
            <el-table-column label="教室" prop="classroomname" />
            <el-table-column label="讲座名" prop="lectrueinfo" />
            <el-table-column label="日期" prop="date" />
            <el-table-column label="签到" prop="sign">
                <template #default="scope">
                    <el-tag
                        :type="scope.row.sign === '0' ? '' : 'success'"
                        disable-transitions
                    >{{ scope.row.sign === '0' ? "未签到" : "已签到" }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #default="scope">
                    <el-button
                        size="small"
                        type="success"
                        @click="handleDelete(scope.$index, scope.row)"
                    >签到</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" width="30%" :before-close="handleClose">
            <span>确认预约讲座吗?</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="del(1, classroom, info, date)">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { SelectAppointment, UpdateAppointment, SelectUser } from '../views/service'
import { ElMessageBox, ElMessage } from 'element-plus'

const options = ref([])
let tableData = ref([])
const dialogVisible = ref(false)
const info = ref("")
const classroom = ref("")
const date = ref("")
const Username = ref("")
const store = useStore()
Username.value = store.state.studentdata.name

watch(Username, (newval) => {
    selectlect(newval)
})

onMounted(() => {
    SelectUser().then((res) => {
        console.log("🚀 ~ res", res.data)
        options.value = res.data
    })
    console.log(11111, Username.value);
    selectlect(Username.value)
})

const selectlect = (Username) => {
    SelectAppointment(Username).then((res) => {
        console.log(res.data);
        tableData.value = res.data
    })
}
// 删除按钮
const handleDelete = (index, row) => {
    dialogVisible.value = true
    info.value = row.lectrueinfo
    classroom.value = row.classroomname
    date.value = row.date
}
// 删除方法
const del = (sign, classroom, lectureinfo, date) => {
    dialogVisible.value = false
    UpdateAppointment(sign, classroom, lectureinfo, date).then((res) => {
        if (res.data === "签到成功") {
            ElMessage.success("签到成功");
            selectlect(Username.value)
        } else {
            ElMessage.error("签到失败");
        }
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