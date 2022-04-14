<template>
	<div :style="container">
		<el-container>
			<el-main>
				<h3>修改教室信息</h3>
				<br />
				<el-divider>请输入</el-divider>
				<div style="width: 40%;  display: flex; align-items: center">
					<el-input v-model="classId" placeholder="请输入教室号"
						style="display: inline-block; margin-right: 10px;" />
					<el-select v-model="floor" class="m-2" placeholder="请选择楼层" size="large"
						style="width: 100%; margin-right: 10px">
						<el-option v-for="item of options" :label="item" :value="item"></el-option>
					</el-select>
					<el-select v-model="classroomNumber" class="m-2" placeholder="请选择教学楼" size="large"
						style="width: 100%; margin-right: 10px">
						<el-option v-for="item of options1" :label="item" :value="item"></el-option>
					</el-select>
					<el-button type="primary" icon="el-icon-edit" @click="updataRoom">修改</el-button>
				</div>
			</el-main>
		</el-container>
		<el-table :data="tableData" style="width: 95%; margin: 0 10px;">
			<el-table-column label="教室" prop="classroomname" />
			<el-table-column label="楼层" prop="floor" />
			<el-table-column label="教室楼号" prop="classroomNumber" />
			<el-table-column align="right">
				<template #default="scope">
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
					</el-button>
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

<script>
import { UpdataRoom, AllClassRoom, DeleteClassRoom } from "../views/service.js";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { ElMessageBox } from 'element-plus'
export default {
	name: "UpdataRoom",
	components: {
		ElMessageBox
	},
	setup(props) {
		const container = {
			width: "100%",
		};
		const updataClassName = ref("");
		const dialogVisible = ref(false)

		const store = useStore();
		const classId = ref("");
		const tableData = ref([]);
		const info = ref("")
		const options = [
			"一楼", "二楼", "三楼", "四楼", "五楼", "六楼"
		]
		const options1 = [
			"一号楼", "二号楼", "三号楼"
		]
		const floor = ref("");
		const classroomNumber = ref("");
		const selectClassroom = () => {
			AllClassRoom().then((res) => {
				tableData.value = res.data
			})
		}
		const updataRoom = () => {
			UpdataRoom(classId.value, floor.value, classroomNumber.value).then(
				(res) => {
					store.commit("resDataT", res.data);
					selectClassroom()
					ElMessage.success("修改成功");
				},
				(err) => {
					ElMessage.error("改修失败");
				}
			);
		};
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
		const handleDelete = (index, row) => {
			dialogVisible.value = true
			info.value = row.classroomname
		}
		const del = (lectureinfo) => {
			dialogVisible.value = false
			DeleteClassRoom(lectureinfo).then((res) => {
				selectClassroom()
			})
		}
		onMounted(() => {
			selectClassroom()
		})
		return {
			updataRoom,
			updataClassName,
			useStore,
			// updataClassId,
			container,
			classId,
			tableData,
			options,
			options1,
			floor,
			classroomNumber,
			handleClose,
			dialogVisible,
			handleDelete,
			info,
			del
		};
	},
};
</script>

<style lang="scss">
.el-button {
	height: 30px;
}
</style>