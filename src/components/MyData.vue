<template>
	<div class="Mydata">
		<el-descriptions
			class="margin-top"
			title="我的信息"
			:column="3"
			:size="size"
			border
		>
			<el-descriptions-item>
				<template #label>
					<i class="el-icon-user"></i>
					姓名
				</template>
				{{ userName }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<i class="el-icon-mobile-phone"></i>
					id
				</template>
				{{ userId }}
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<i class="el-icon-location-outline"></i>
					预约的教室
				</template>
				{{ classState }}
			</el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script>
import { useStore } from "vuex";
export default {
	name: "MyData",
	setup(props) {
		const store = useStore();
		const userName = store.state.studentdata.name;
		const userId = store.state.studentdata.id;
		const classState = store.state.studentdata.state;
		return {
			useStore,
			userName,
			userId,
			classState,
		};
	},
};
</script>

<style lang="scss" scoped>
.Mydata {
	height: 100%;
	margin-top: -200px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.el-descriptions {
		width: 55%;
	}
}
</style>
