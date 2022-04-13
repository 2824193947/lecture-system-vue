<template>
	<div :style="container">
		<el-container>
			<el-main>
				<h3>修改教室信息</h3>
				<br />
				<el-divider>请输入</el-divider>
				<div style="width: 40%;  display: flex; align-items: center">
					<el-input v-model="classId" placeholder="请输入教室号" style="display: inline-block; margin-right: 10px;"/>
					<el-input v-model="updataClassName" placeholder="请输入新增加的教室名" style="display: inline-block; margin-right: 10px;"/>
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
	</div>
</template>

<script>
import { UpdataRoom, AllClassRoom } from "../views/service.js";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
export default {
	name: "UpdataRoom",
	setup(props) {
		const container = {
			width: "100%",
		};
		const updataClassName = ref("");
		const store = useStore();
		const classId = ref("");
		const tableData = ref([])
		const selectClassroom = () => {
			AllClassRoom().then((res) => {
				tableData.value = res.data
			})
		}
		const updataRoom = () => {
			UpdataRoom(classId.value, updataClassName.value).then(
				(res) => {
					console.log(res);
					store.commit("resDataT", res.data);
					ElMessage.success("修改成功");
				},
				(err) => {
					ElMessage.error("改修失败");
				}
			);
		};
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
			tableData
		};
	},
};
</script>

<style lang="scss">
.el-button {
	height: 30px;
}
</style>