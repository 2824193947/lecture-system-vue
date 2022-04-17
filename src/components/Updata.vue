<template>
	<div class="Mydata">
		<div style="display: flex; flex-direction: column; align-items: center;">
			<el-card class="box-card">
				<h3>修改信息</h3>
				<br />
				<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
					:size="formSize">
					<el-form-item label="姓名" prop="name">
						<el-input v-model="ruleForm.name" />
					</el-form-item>
					<el-form-item label="性别" prop="gender">
						<el-select v-model="ruleForm.gender" placeholder="请选择性别" default="男">
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
						</el-select>
					</el-form-item>
					<el-form-item label="手机号" prop="phoneNumber">
						<el-input v-model="ruleForm.phoneNumber" />
					</el-form-item>
					<el-form-item label="邮箱" prop="mail">
						<el-input v-model="ruleForm.mail" />
					</el-form-item>
					<el-form-item label="年龄" prop="age">
						<el-input-number v-model="ruleForm.age" :min="18" :max="80" />
					</el-form-item>
					<el-form-item label="密码" prop="pwd">
						<el-input type="password" v-model="ruleForm.pwd" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitForm(ruleFormRef)">
							提交
						</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { ref, onMounted, reactive } from "vue"
import { upData, addApply, queryApply } from "../views/service";
import LocalStorage from "../utils/store"
import { ElMessageBox, ElMessage } from 'element-plus';

export default {
	name: "MyData",
	setup(props) {
		const store = useStore();
		// const tableData = ref([])
		const radio = ref(1)
		const userName = ref('');
		const userId = ref('');
		const age = ref('');
		const gender = ref('');
		const mail = ref('');
		const phoneNumber = ref('');
		const youName = ref('');
		const pwd = ref('');
		const role = ref('');
		const formSize = ref('medium')
		const ruleFormRef = ref()
		const ruleForm = reactive({
			name: '',
			gender: '',
			phoneNumber: '',
			mail: '',
			age: '',
			pwd: '',
		})
		const complete = ref("")
		const id = ref(0)
		onMounted(() => {
			userName.value = LocalStorage.getLocalstore("studentInfo").name;
			userId.value = LocalStorage.getLocalstore("studentInfo").id;
			age.value = LocalStorage.getLocalstore("studentInfo").age;
			gender.value = LocalStorage.getLocalstore("studentInfo").gender;
			mail.value = LocalStorage.getLocalstore("studentInfo").mail;
			phoneNumber.value = LocalStorage.getLocalstore("studentInfo").phoneNumber;
			youName.value = LocalStorage.getLocalstore("studentInfo").youName;
			pwd.value = LocalStorage.getLocalstore("studentInfo").pwd;
			role.value = LocalStorage.getLocalstore("studentInfo").role;
			ruleForm.name = userName.value
			ruleForm.gender = gender.value
			ruleForm.phoneNumber = phoneNumber.value
			ruleForm.mail = mail.value
			ruleForm.age = age.value
		})
		complete.value = LocalStorage.getLocalstore("studentInfo").complete
		id.value = LocalStorage.getLocalstore("studentInfo").id
		const checkEmail = (rule, value, callback) => {
			const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (regEmail.test(value)) {
				return callback();
			}
			callback(new Error("邮箱"));
		};
		const rules = reactive({
			name: [
				{ required: true, message: '请输入姓名', trigger: 'blur' },
				{ min: 2, max: 10, message: '姓名长度在 3 到 5', trigger: 'blur' },
			],
			phoneNumber: [
				{ required: true, message: '请输入电话号', trigger: 'blur' },
				{ min: 11, max: 11, message: '电话号为11位数字', trigger: 'blur' },
			],
			mail: [
				{ required: true, message: '输入正确的邮箱', trigger: 'blur' },
				{ validator: checkEmail, message: '输入正确的邮箱', trigger: 'blur' },
			],
		})
		const submitForm = async (formEl) => {
			if (!formEl) {
				ElMessage.error("请填写完整信息");
				return
			} else if (ruleForm.pwd !== pwd.value) {
				ElMessage.error("密码错误");
				return
			}
			await formEl.validate((valid, fields) => {
				if (valid) {
					upData(new Number(id.value), ruleForm.phoneNumber, ruleForm.mail, ruleForm.age, ruleForm.name, ruleForm.gender, "yes", ruleForm.pwd, userName.value).then((res) => {
						LocalStorage.setLocalstore('studentInfo', res.data)
						ElMessage.success("修改成功!");
					})
					console.log('submit!')
				} else {
					console.log('error submit!', fields)
				}
			})

		}
		const resetForm = (formEl) => {
			if (!formEl) return
			formEl.resetFields()
		}

		const apply = (radio) => {
			queryApply().then(res => {
				res.data.map((item) => {
					if (item.name === userName.value) {
						ElMessage.warning("请勿重复申请, 等待管理员处理!");
					} else {
						if (radio === 1) {
							addApply(userName.value, 'student').then((res) => {
								ElMessage.success("成功申请权限");
								console.log(res);
							})
						} else {
							addApply(userName.value, 'admin').then((res) => {
								ElMessage.success("成功申请权限");
								console.log(res);
							})
						}
					}
				})
			})
		}

		return {
			useStore,
			userName,
			userId,
			resetForm,
			submitForm,
			rules,
			ruleForm,
			ruleFormRef,
			formSize,
			complete,
			radio,
			apply,
		};
	},
};
</script>

<style lang="scss" scoped>
.Mydata {
	min-height: 100%;
	padding-top: 70px;

	.el-descriptions {
		width: 55%;
	}

	.el-form {
		width: 45%;
	}
}
</style>

<style lang="scss">
.box-card {
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;

	.el-descriptions {
		width: 55%;
	}

	.demo-ruleForm {
		width: 50%;
	}

	.el-form {
		width: 45%;
		margin: 0 auto;
		margin-left: 200px;
	}
}
</style>