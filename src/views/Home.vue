<template>
	<div>
		<el-header >
				<span>
					Hi~
					<span style="font-size: 30px">&nbsp;{{ userName }}</span>
					&nbsp;&nbsp;你的id是:
					<span style="font-size: 30px">{{id}}</span>
				</span>
		</el-header>
			<el-container style="border: 1px solid #eee" :style="container">
			<el-aside width="17%">
				<div class="menu-head">
					<i class="el-icon-message"></i>
					<span>文博教育讲座预约系统</span>
				</div>
				<el-menu :default-openeds="['1']">
					<el-sub-menu index="1">
						<template #title><i class="el-icon-message"></i>信息操作</template>
						<el-menu-item-group>
							<el-menu-item index="1-1" @click="pushAdd">增加信息</el-menu-item>
							<el-menu-item index="1-2" @click="pushUpdata">修改信息</el-menu-item>
							<el-menu-item index="1-3" @click="pushReClassRoom">教室预约</el-menu-item>
						</el-menu-item-group>
						<el-sub-menu index="1-4">
							<template #title><i class="el-icon-menu"></i>教室操作</template>
							<el-menu-item index="1-4-1" @click="pushAddClassRoom">教室新增</el-menu-item>
							<el-menu-item index="1-4-2" @click="pushUpdataClassRoom">教室修改</el-menu-item>
						</el-sub-menu>
					</el-sub-menu>
					<el-sub-menu index="2">
						<template #title><i class="fas fa-user-astronaut mr"></i>个人信息</template>
						<el-menu-item-group>
							<el-menu-item index="2-1" @click="pushMyData">我的信息</el-menu-item>
							<el-menu-item index="2-2" @click="pushAdd"
								>已预约的教室</el-menu-item
							>
							<el-menu-item index="2-3" @click="pushAdd"
								>修改信息</el-menu-item
							>
						</el-menu-item-group>
					</el-sub-menu>
					<el-sub-menu index="3">
						<template #title><i class="fab fa-amazon mr"></i>讲座管理</template>
						<el-menu-item-group>
							<el-menu-item index="3-1" @click="$router.push('/Home/AddLcture')">讲座发布</el-menu-item>
							<el-menu-item index="3-2" @click="">讲座修改</el-menu-item>
							<el-menu-item index="3-3" @click="">讲座查询</el-menu-item>
						</el-menu-item-group>
					</el-sub-menu>
					<el-sub-menu index="4">
						<template #title><i class="el-icon-setting"></i>设置</template>
						<el-menu-item-group>
							<el-menu-item index="3-1" @click="pushLogin">退出登录</el-menu-item>
							<el-menu-item index="3-2" @click="deleteinfo(userName)">注销账号</el-menu-item>
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
			userName: this.$store.state.studentdata.name,
			id: this.$store.state.studentdata.id,
		};
	},
	created() {
		console.log(this.userName);
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
		deleteinfo(userName) {
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
	margin-top:10px;
	i {
		color: #4a91e2;
	}
	span {
		font-weight: bold;
		color: #4a91e2;
		padding-left: 5px;
	}
}
.el-header {
	text-align: right;
	font-size: 17px;
	position: absolute;
	right: 0;
}
.el-aside {
	background-color: rgb(253, 253, 253);
	min-height: 100vh;
	.el-menu {
		background-color: rgb(253, 253, 253);
		.el-menu-item-group {
			background-color: rgb(253, 253, 253);
		}
		.el-sub-menu {
			background-color: rgb(253, 253, 253);
			.el-menu-item {
				background-color: rgb(253, 253, 253);
			}
		}
	}
}
.router-container {
	min-height: 100vh;
	flex: 1;
}
</style>
