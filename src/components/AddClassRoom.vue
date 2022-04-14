<template>
	<div :style="container">
		<el-container>
			<el-main>
				<h3>新增教室信息</h3>
				<br />
				<el-divider>请输入</el-divider>
				<div style="width: 50%;  display: flex;">
					<el-input v-model="newClassRoom" placeholder="请输入教室号" style="margin-right: 10px;" />
					<el-select v-model="floor" class="m-2" placeholder="请选择楼层" size="large"
						style="width: 100%; margin-right: 10px">
						<el-option v-for="item of options" :label="item" :value="item"></el-option>
					</el-select>
					<el-select v-model="classroomNumber" class="m-2" placeholder="请选择教学楼" size="large"
						style="width: 100%; margin-right: 10px">
						<el-option v-for="item of options1" :label="item" :value="item"></el-option>
					</el-select>
					<el-button type="primary" icon="el-icon-edit" @click="Add">新增</el-button>
				</div>
			</el-main>
		</el-container>
		<el-table :data="tableData" style="width: 95%; margin: 0 10px;">
			<el-table-column label="教室" prop="classroomname" />
			<el-table-column label="楼层" prop="floor" />
			<el-table-column label="教室楼号" prop="classroomNumber" />
			<!-- <el-table-column align="right">
				<template #default="scope">
					<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete
					</el-button>
				</template>
			</el-table-column> -->
		</el-table>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";
import { AddRoom, AllClassRoom } from "../views/service.js";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
export default {
	name: "AddClassRoom",
	setup(props) {
		const container = {
			width: "100%",
		};
		const store = useStore();
		const newClassRoom = ref("");
		const floor = ref("");
		const classroomNumber = ref("");
		const tableData = ref([])
		const options = [
			"一楼", "二楼", "三楼", "四楼", "五楼", "六楼"
		]
		const options1 = [
			"一号楼", "二号楼", "三号楼"
		]

		const selectClassroom = () => {
			AllClassRoom().then((res) => {
				tableData.value = res.data
			})
		}
		const Add = () => {
			AddRoom(newClassRoom.value, floor.value, classroomNumber.value).then(
				(res) => {
					console.log(res);
					store.commit("resDataT", res.data);
					selectClassroom()
					ElMessage.success("新增成功！");
				},
				(err) => {
                console.log("🚀 ~ err", err)
					ElMessage.error("新增失败！");
				}
			);
		};
		onMounted(() => {
			selectClassroom()
		})
		return {
			container,
			newClassRoom,
			Add,
			store,
			tableData,
			classroomNumber,
			floor,
			options,
			options1
		};
	},
};
</script>
