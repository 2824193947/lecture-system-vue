<template>
	<el-form
		ref="formRef"
		:model="formModel"
		status-icon
		:rules="rules"
		label-width="120px"
		class="login-form"
	>
		<el-form-item label="学号" prop="id" v-if="!showCheck">
			<el-input v-model="formModel.id"></el-input>
		</el-form-item>
		<el-form-item label="名字" prop="name" v-if="showCheck">
			<el-input v-model="formModel.name"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input
				v-model="formModel.password"
				type="password"
				autocomplete="off"
			></el-input>
		</el-form-item>
		<el-form-item v-if="showCheck" label="再次输入密码" prop="checkPass">
			<el-input
				v-model="formModel.checkPass"
				type="password"
				autocomplete="off"
			></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm()">{{
				showCheck ? "注册" : "登录"
			}}</el-button>
			<el-button @click="resetForm()">清空</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import { ref, defineComponent, reactive } from "vue";
import {} from "element-plus";
export default defineComponent({
	props: {
		showCheck: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["loginSub", "registerSub"],
	setup(props, { emit }) {
		const formModel = reactive({
			password: "",
			checkPass: "",
			id: "",
			name: "",
		});
		const rules = {
			password: [
				{
					required: true,
					message: "请输入密码",
				},
			],
			checkPass: [
				{
					required: true,
					message: "请再次输入密码",
				},
				{
					validator: (rule, value, callback) => {
						if (formModel.checkPass == formModel.password) {
							callback();
						} else {
							callback(new Error("两次密码不一样"));
						}
					},
					trigger: "blur",
				},
			],
			id: [
				{
					required: true,
					message: "请输入学号",
				},
				{
					pattern: /^[0-9]+$/,
					message: "学号必须是数字",
				},
			],
			name: [
				{
					required: true,
					message: "请输入名字",
				},
			],
		};
		const formRef = ref();
		const resetForm = () => {
			formRef.value.resetFields();
		};
		const submitForm = () => {
			formRef.value.validate((valid, { password, id, name }) => {
				console.log(valid);
				console.log(id, password, name);
				if (valid) {
					console.log(props.showCheck);
					if (props.showCheck == true) {
						emit("registerSub", { name, password });
					} else {
						emit("loginSub", { id, password });
					}
				} else {
					console.log(valid);
				}
			});
		};
		return {
			rules,
			formModel,
			formRef,
			resetForm,
			submitForm,
		};
	},
});
</script>

<style scoped>
.login-form {
	position: absolute;
	top: 30%;
	right: 20%;
	left: 0;
}
</style>
