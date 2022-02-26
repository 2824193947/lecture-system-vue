<template>
	<div :style="container">
		<el-container>
			<el-main>
				<h3>讲座发布</h3>
				<br />
				<el-divider>请输入</el-divider>
				<div style="width: 100%; position: relative; margin: auto; display: flex;">
					<el-select v-model="ClassRoom" class="m-2" placeholder="选择教室" size="large">
						<el-option v-for="item in options" :key="item.classroomname" :label="item.classroomname" :value="item.classroomname"></el-option>
					</el-select>
					<el-input v-model="lctureInfo" placeholder="请输入讲座名称" />
					<el-date-picker v-model="value1" type="date" placeholder="Pick a day"></el-date-picker>
					<el-button type="primary" icon="el-icon-edit" @click="Add">新增</el-button>
				</div>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { AddLcture, AllClassRoom } from "../views/service.js";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
export default {
	name: "AddLcture",
	setup(props) {
		const container = {
			width: "100%",
		};
		const store = useStore();
		const ClassRoom = ref("");
		const lctureInfo = ref("")
		const value1 = ref('')
		const options = ref([])

		watch(value1, (newval) => {
			console.log(newval);
		})
		onMounted(() => {
			AllClassRoom().then((res) => {
				console.log(res.data);
				options.value = res.data
			})
		})

		const Add = () => {
			AddLcture(lctureInfo.value, ClassRoom.value).then(
				(res) => {
					console.log(res);
					if (res.data === '添加讲座成功') {
						ElMessage.success("新增成功！");
					} else {
						ElMessage.error("新增失败！");
					}
				},
			);
		};
		return {
			container,
			ClassRoom,
			lctureInfo,
			options,
			value1,
			Add,
			store,
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
