<template>
	<div class="Mydata">
		<h3>基本信息</h3>
		<article style="margin: 40px 0; width: 800px;">
			<el-table :data="tableData" stripe border style="width: 95%; margin: 0 10px;">
				<el-table-column prop="userId" label="ID" width="180" />
				<el-table-column prop="userName" label="账号" width="180" />
				<el-table-column prop="classState" label="教室" />
			</el-table>
		</article>
		<h3>补充信息</h3>
		<br/>
		<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
			:size="formSize">
			<el-form-item label="姓名" prop="name">
				<el-input v-model="ruleForm.name" />
			</el-form-item>
			<el-form-item label="性别" prop="region">
				<el-select v-model="ruleForm.region" placeholder="Activity zone">
					<el-option label="Zone one" value="shanghai" />
					<el-option label="Zone two" value="beijing" />
				</el-select>
			</el-form-item>
			<el-form-item label="姓名" required>
				<el-col :span="11">
					<el-form-item prop="date1">
						<el-date-picker v-model="ruleForm.date1" type="date" placeholder="Pick a date"
							style="width: 100%" />
					</el-form-item>
				</el-col>
				<el-col class="text-center" :span="2">
					<span class="text-gray-500">-</span>
				</el-col>
				<el-col :span="11">
					<el-form-item prop="date2">
						<el-time-picker v-model="ruleForm.date2" placeholder="Pick a time" style="width: 100%" />
					</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item label="Instant delivery" prop="delivery">
				<el-switch v-model="ruleForm.delivery" />
			</el-form-item>
			<el-form-item label="Activity type" prop="type">
				<el-checkbox-group v-model="ruleForm.type">
					<el-checkbox label="Online activities" name="type" />
					<el-checkbox label="Promotion activities" name="type" />
					<el-checkbox label="Offline activities" name="type" />
					<el-checkbox label="Simple brand exposure" name="type" />
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="Resources" prop="resource">
				<el-radio-group v-model="ruleForm.resource">
					<el-radio label="Sponsorship" />
					<el-radio label="Venue" />
				</el-radio-group>
			</el-form-item>
			<el-form-item label="Activity form" prop="desc">
				<el-input v-model="ruleForm.desc" type="textarea" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm(ruleFormRef)">Create</el-button>
				<el-button @click="resetForm(ruleFormRef)">Reset</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { useStore } from "vuex";
import { ref, onMounted, reactive } from "vue"
import Updata from "./Updata.vue";
export default {
	name: "MyData",
	components: {
		Updata
	},
	setup(props) {
		const store = useStore();
		const tableData = ref([])
		let userName = store.state.studentdata.name;
		let userId = store.state.studentdata.id;
		let classState = store.state.studentdata.state;
		onMounted(() => {
			userName = store.state.studentdata.name;
			userId = store.state.studentdata.id;
			classState = store.state.studentdata.state;
			tableData.value.push(
				{ "userName": userName, "userId": userId, "classState": userId },
			)
			// console.log(tableData.value);
		})


		const formSize = ref('medium')
		const ruleFormRef = ref()
		const ruleForm = reactive({
			name: 'Hello',
			region: '',
			date1: '',
			date2: '',
			delivery: false,
			type: [],
			resource: '',
			desc: '',
		})

		const rules = reactive({
			name: [
				{ required: true, message: 'Please input Activity name', trigger: 'blur' },
				{ min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
			],
			region: [
				{
					required: true,
					message: 'Please select Activity zone',
					trigger: 'change',
				},
			],
			date1: [
				{
					type: 'date',
					required: true,
					message: 'Please pick a date',
					trigger: 'change',
				},
			],
			date2: [
				{
					type: 'date',
					required: true,
					message: 'Please pick a time',
					trigger: 'change',
				},
			],
			type: [
				{
					type: 'array',
					required: true,
					message: 'Please select at least one activity type',
					trigger: 'change',
				},
			],
			resource: [
				{
					required: true,
					message: 'Please select activity resource',
					trigger: 'change',
				},
			],
			desc: [
				{ required: true, message: 'Please input activity form', trigger: 'blur' },
			],
		})

		const submitForm = async (formEl) => {
			if (!formEl) return
			await formEl.validate((valid, fields) => {
				if (valid) {
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

		return {
			useStore,
			userName,
			userId,
			classState,
			tableData,
			resetForm,
			submitForm,
			rules,
			ruleForm,
			ruleFormRef,
			formSize
		};
	},
};
</script>

<style lang="scss" scoped>
.Mydata {
	min-height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 70px;

	.el-descriptions {
		width: 55%;
	}
}
</style>
