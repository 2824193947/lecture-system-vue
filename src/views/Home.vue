<template>
	<div>
		<el-header>
			<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
			<span>
				用户名:
				<span style="font-size: 30px">&nbsp;{{ userName }}</span>
			</span>
		</el-header>
		<el-container style="border: 1px solid #eee" :style="container">
			<el-aside width="17%">
				<div class="menu-head">
					<i class="fab fa-audible"></i>
					<span>文博教育讲座预约系统</span>
				</div>
				<el-menu :default-openeds="['3']">
					<el-sub-menu index="1" v-if="role">
						<template #title>
							<i class="el-icon-message"></i>管理员操作
						</template>
						<el-menu-item-group>
							<el-menu-item index="1-1" @click="$router.push('/Home/SelectUser')">所有用户</el-menu-item>
							<el-menu-item index="1-2" @click="$router.push('/Home/AdminSign')">人员签到</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-sub-menu index="2" v-if="role">
						<template #title>
							<i class="el-icon-menu"></i>教室操作
						</template>
						<el-menu-item index="2-1" @click="pushAddClassRoom">教室新增</el-menu-item>
						<el-menu-item index="2-2" @click="pushUpdataClassRoom">教室修改</el-menu-item>
					</el-sub-menu>
					<el-sub-menu index="3">
						<template #title>
							<i class="fas fa-user-astronaut mr"></i>个人信息
						</template>
						<el-menu-item-group>
							<el-menu-item index="3-1" @click="pushMyData">我的信息</el-menu-item>
							<el-menu-item index="3-2" @click="pushUpdata">修改信息</el-menu-item>
							<el-menu-item index="3-3" @click="$router.push('/Home/Appointment')">讲座预约</el-menu-item>
							<el-menu-item index="3-4" @click="$router.push('/Home/Dign')">待参加讲座</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-sub-menu index="4" v-if="role">
						<template #title>
							<i class="fab fa-amazon mr"></i>讲座管理
						</template>
						<el-menu-item-group>
							<el-menu-item index="4-1" @click="$router.push('/Home/AddLcture')">讲座发布</el-menu-item>
							<!-- <el-menu-item index="4-2" @click="$router.push('/Home/UpdateLecture')">讲座修改</el-menu-item> -->
							<el-menu-item index="4-3" @click="$router.push('/Home/QueryLecture')">讲座查询</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-sub-menu index="5">
						<template #title>
							<i class="el-icon-setting"></i>设置
						</template>
						<el-menu-item-group>
							<el-menu-item index="5-1" @click="pushLogin">退出登录</el-menu-item>
							<el-menu-item index="5-2" @click="deleteinfo(userName)">注销账号</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
				</el-menu>
			</el-aside>
			<div class="router-container">
				<router-view></router-view>
			</div>
		</el-container>
	</div>
</template>

<script>
import { deleteUser } from "./service.js";
import LocalStorage from "../utils/store"

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
				display: "flex"
			},
			userName: LocalStorage.getLocalstore("studentInfo").name,
		};
	},
	created() {
		console.log("studentdata", this.$store.state.studentdata);
		this.role = LocalStorage.getLocalstore("studentInfo").role === "admin" ? true : false
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
			localStorage.removeItem('studentInfo')
			localStorage.removeItem('classInfo')
			this.$router.push("/");
		},
		pushUpdataClassRoom() {
			this.$router.push("/Home/UpdataRoom");
		},
		pushMyData() {
			this.$router.push("/Home/MyData");
		},
		deleteinfo(userName) {
			localStorage.removeItem('studentInfo')
			localStorage.removeItem('classInfo')
			deleteUser(userName).then((res) => {
				this.$message.error("注销成功");
				this.$router.push("/");
			}).catch(() => {
				this.$message.error("注销失败");
			})
		}
	},
};
</script>

<style scoped lang="scss">
.mr {
	margin: 9px;
}
.menu-head {
	margin: 10px 0;
	i {
		color: #4a91e2;
		font-size: 25px;
	}
	span {
		font-weight: bold;
		color: #4a91e2;
		padding-left: 5px;
	}
}
.el-header {
	text-align: right;
	font-size: 16px;
	position: absolute;
	right: 0;
	display: flex;
	align-items: center;
	.el-avatar {
		margin-right: 5px;
	}
}
.el-aside {
	background-color: rgb(211, 211, 211);
	min-height: 100vh;
	.el-menu {
		background-color: rgb(211, 211, 211);
		.el-menu-item-group {
			background-color: rgb(211, 211, 211);
		}
		.el-sub-menu {
			background-color: rgb(211, 211, 211);
			.el-menu-item {
				background-color: rgb(211, 211, 211);
			}
		}
	}
}
.router-container {
	min-height: 100vh;
	flex: 1;
}
</style>
