<template>
	<div :style="container">
		<el-container>
			<el-main>
				<h3>讲座发布</h3>
				<br />
				<el-divider>请输入</el-divider>
				<div style="width: 100%; position: relative; margin: auto; display: flex;">
					<el-select v-model="ClassRoom" class="m-2" placeholder="选择教室" size="large">
						<el-option v-for="item in options" :key="item.classroomname" :label="item.classroomname"
							:value="item.classroomname"></el-option>
					</el-select>
					<el-input v-model="lctureInfo" placeholder="请输入讲座名称" />
					<el-date-picker v-model="value1" type="date" placeholder="Pick a day"></el-date-picker>
					<el-button type="primary" icon="el-icon-edit" @click="Add">新增</el-button>
				</div>
			</el-main>
		</el-container>
		<el-table :data="tableData" style="width: 95%; margin: 0 10px;">
			<el-table-column label="预约讲座" prop="lectureinfo" />
			<el-table-column label="教室" prop="classroomname" />
			<el-table-column label="日期" prop="date" />
		</el-table>
	</div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { AddLcture, AllClassRoom, SelectLecture, SelectLectureClass } from "../views/service.js";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import QueryLecture from "./QueryLecture.vue"
export default {
	name: "AddLcture",
	components: { QueryLecture },
	setup(props) {
		const container = {
			width: "100%",
		};
		const store = useStore();
		const ClassRoom = ref("");
		const lctureInfo = ref("")
		const value1 = ref('')
		const options = ref([])
		const dateArr = ref([])
		const tableData = ref([])

		watch(value1, (newval) => {
			console.log(newval);
		})
		watch(value1, (newval) => {
			if (dateArr.value.includes(getNowFormatDate(newval))) {
				ElMessage.error("日期已经预约！");
			} else {
				ElMessage.success("日期选择成功！");
			}
		})
		watch(ClassRoom, (newval) => {
			dateArr.value = []
			SelectLectureClass(newval).then((res) => {
				console.log("查询教室预约日期", res.data);
				res.data.forEach(item => {
					dateArr.value.push(item.date)
				});
			})
		})
		const selectlect1 = () => {
			SelectLecture().then((res) => {
				res.data.forEach(item => {
					item.date = item.date + ' 8:00'
				})
				tableData.value = res.data
                console.log("🚀 ~ tableData.value", tableData.value)
			})
		}
		onMounted(() => {
			AllClassRoom().then((res) => {
				console.log("教室信息", res.data);
				options.value = res.data
			})
			selectlect()
			selectlect1()
		})

		const Add = () => {
			if (!lctureInfo.value) {
				ElMessage.warning("必须填写讲座名字");
			} else if (dateArr.value.includes(getNowFormatDate(value1.value))) {
				ElMessage.error("日期已经预约");
			} else {
				AddLcture(lctureInfo.value, ClassRoom.value, getNowFormatDate(value1.value)).then(
					(res) => {
						console.log(res);
						if (res.data === '添加讲座成功') {
							ElMessage.success("新增成功");
							selectlect1()
						} else {
							ElMessage.error("新增失败");
						}
					},
				);
			}
		};
		const selectlect = () => {
			SelectLecture().then((res) => {
				res.data.map(item => {
					dateArr.value.push(item.date)
				})
			})
		}
		const getNowFormatDate = (date) => {
			var seperator1 = "-";
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = year + seperator1 + month + seperator1 + strDate;
			return currentdate;
		}
		return {
			container,
			ClassRoom,
			lctureInfo,
			options,
			value1,
			Add,
			store,
			tableData
		};
	},
};
</script>

<style lang="scss" scoped>
.el-input {
	margin: 0 10px;
	width: 300px;
}

.el-button {
	margin-left: 10px;
}
</style>
