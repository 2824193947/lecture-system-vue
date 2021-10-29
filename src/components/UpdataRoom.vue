<template>
	<div :style="container">
		<el-container>
			<el-main>
				<h3>修改教室信息</h3>
				<br />
				<el-divider>请输入</el-divider>
				<div style="width: 20%; position: relative; margin: auto">
					<el-input
						v-model="classId"
						placeholder="请输入教室号"
						class="addInput"
					/>
					<br />
					<br />
					<el-input
						v-model="updataClassName"
						placeholder="请输入新增加的教室名"
						class="addInput"
					/>
					<br />
					<br />
					<el-button
						type="primary"
						icon="el-icon-edit"
						@click="updataRoom"
						>修改</el-button
					>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import { UpdataRoom } from "../views/service.js";
import { ref } from "vue";
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
		// const updataClassId = store.state.classroomdata;
		const classId = ref("");
		// const classIdtrue ="";
		// const foundclassid=()=>{
		// 	const classolddata = store.state.classroomdata
		// 	for(i = 0;i<=classolddata.length;i++){
		// 		if(classolddata[i].id == classId.value ){

		// 		}
		// 	}
		// }
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
		return {
			updataRoom,
			updataClassName,
			useStore,
			// updataClassId,
			container,
			classId,
		};
	},
};
</script>
