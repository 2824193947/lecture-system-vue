<template>
	<el-container style="border: 1px solid #eee" :style="container">
		<el-aside width="15%" style="background-color: rgb(238, 241, 246)">
			<el-menu :default-openeds="['1', '3']">
				<el-sub-menu index="1">
					<template #title
						><i class="el-icon-message"></i>学生中心</template
					>
					<el-menu-item-group>
						<template #title>操作一</template>
						<el-menu-item index="1-1" @click="pushAdd"
							>增加信息</el-menu-item
						>
						<el-menu-item index="1-2" @click="pushUpdata"
							>修改信息</el-menu-item
						>
					</el-menu-item-group>
					<el-menu-item-group title="操作二">
						<el-menu-item index="1-3" @click="pushReClassRoom"
							>进行教室预约</el-menu-item
						>
					</el-menu-item-group>
					<el-sub-menu index="1-4">
						<template #title>进行教室操作</template>
						<el-menu-item index="1-4-1" @click="pushAddClassRoom"
							>教室新增</el-menu-item
						>
						<el-menu-item index="1-4-2" @click="pushUpdataClassRoom"
							>教室修改</el-menu-item
						>
					</el-sub-menu>
				</el-sub-menu>
				<el-sub-menu index="2">
					<template #title
						><i class="el-icon-menu"></i>个人信息</template
					>
					<el-menu-item-group>
						<el-menu-item index="2-1" @click="pushMyData"
							>我的信息</el-menu-item
						>
						<el-menu-item index="2-2" @click="pushAdd"
							>已预约的教室</el-menu-item
						>
						<el-menu-item index="2-3" @click="pushAdd"
							>修改信息</el-menu-item
						>
					</el-menu-item-group>
				</el-sub-menu>
				<el-sub-menu index="3">
					<template #title
						><i class="el-icon-setting"></i>设置</template
					>
					<el-menu-item-group>
						<el-menu-item index="3-1" @click="pushLogin"
							>退出登录</el-menu-item
						>
						<el-menu-item index="3-2" @click="pushAdd"
							>注销账号</el-menu-item
						>
						<el-menu-item index="3-3"></el-menu-item>
						<el-menu-item index="3-4-1"></el-menu-item>
					</el-menu-item-group>
				</el-sub-menu>
			</el-menu>
		</el-aside>
		<el-header
			style="
				text-align: right;
				font-size: 17px;
				position: absolute;
				right: 0;
			"
		>
			<el-dropdown>
				<i class="el-icon-setting" style="margin-right: 15px"></i>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item>增加</el-dropdown-item>
						<el-dropdown-item>删除</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
			<span
				>Hi~<span style="font-size: 30px">&nbsp;{{ userName }}</span
				>&nbsp;&nbsp;你的id是:<span style="font-size: 30px">{{
					id
				}}</span></span
			>
		</el-header>
		<router-view></router-view>
	</el-container>
</template>

<script>
export default {
	name: "Home",
	data() {
		return {
			container: {
				position: "absolute",
				top: "0",
				right: "0",
				left: "0",
				bottom: "0",
				margin: "auto",
				flexDirection: "inherit",
			},
			userName: this.$store.state.studentdata.name,
			id: this.$store.state.studentdata.id,
		};
	},
	methods: {
		pushUpdata() {
			this.$router.push("/Home/Updata");
		},
		pushAdd() {
			this.$router.push("/Home/Add");
		},
		pushReClassRoom() {
			this.$router.push("/Home/reClassRoom");
		},
		pushAddClassRoom() {
			this.$router.push("/Home/AddClassRoom");
		},
		pushLogin() {
			this.$router.push("/");
		},
		pushUpdataClassRoom() {
			this.$router.push("/Home/UpdataRoom");
		},
		pushMyData() {
			this.$router.push("/Home/MyData");
		},
	},
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
}
</style>
