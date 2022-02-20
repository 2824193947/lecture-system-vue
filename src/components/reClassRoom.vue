<template>
	<div class="reClassR">
		<el-table :data="tableData" style="width: 29%" max-height="300" border>
			<el-table-column prop="id" label="教室号" width="180" />
			<el-table-column prop="classroomname" label="教室名" width="180" />
		</el-table>
		<br />
		<el-input v-model="appointment" placeholder="请输入要预约的教室名" />
		<br />
		<br />
		<el-button type="primary" round @click="roomAppoinment">预约</el-button>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { roomAppiont } from "../views/service.js";
export default {
	name: "reClassRoom",
	setup(props) {
		const store = useStore();
		const reRoomData = store.state.classroomdata;
		const tableData = reRoomData;
		const appointment = ref("");
		const userId = store.state.studentdata.id;
		const roomAppoinment = () => {
			roomAppiont(userId, appointment.value).then(
				(res) => {
					console.log(res);
					store.commit("resData", res.data);
					ElMessage.success("预约成功！");
				},
				(err) => {
					ElMessage.error("预约失败！");
				}
			);
		};
		return {
			userId,
			tableData,
			appointment,
			roomAppoinment,
		};
	},
};
</script>

<style scoped lang="scss">
.reClassR {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.el-input {
		width: 250px;
	}
}
</style>
