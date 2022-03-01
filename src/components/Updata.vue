<template>
	<div :style="container">
		<el-container>
			<el-main>
				<h3>修改信息</h3>
				<br />
				<el-divider>请输入</el-divider>
				<div style="width: 20%; position: relative; margin: auto">
					<el-input v-model="updataName" placeholder="请输入新名字" class="addInput" />
					<br />
					<br />
					<el-input v-model="updataPassword" placeholder="请输入新密码" show-password />
					<br />
					<br />
					<el-button type="primary" icon="el-icon-edit" @click="updataUser">修改</el-button>
				</div>
				
			</el-main>
		</el-container>
	</div>
</template>

<script>
import { ref } from "vue";
import { upData } from "../views/service.js";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import LocalStorage from "../utils/store"

export default {
	name: "Add",
	// data() {
	// 	return {
	// 		container: {
	// 			width: "100%",
	// 		},
	// 		// updataName: "",
	// 		// updataPassword: "",
	// 	};
	// },
	props: {},
	setup(props) {
		const container = {
			width: "100%",
		};
		const store = useStore();
		const updataPassword = ref("");
		const updataName = ref("");
		const oldname = LocalStorage.getLocalstore("studentInfo").name
		const picture = "";
		const id = store.state.studentdata.id;
		const updataUser = () => {
			// localStorage.removeItem('studentInfo')
			upData(
				id,
				updataName.value,
				updataPassword.value,
				oldname,
				picture
			).then(
				(res) => {
					LocalStorage.setLocalstore('studentInfo', res.data)
					// store.commit("resData", res.data.studentInfo);
					ElMessage.success("修改成功");
					location.reload()
				},
				(err) => {
					ElMessage.error("修改失败");
				}
			);
		};
		return {
			container,
			updataPassword,
			updataName,
			updataUser,
		};
	},
};
</script>

<style>
.addInput {
	margin-top: 20px;
}
</style>
