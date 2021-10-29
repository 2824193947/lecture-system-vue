<template>
	<div>
		<div class="switch">
			<el-switch
				class="switch"
				v-model="isActive"
				inactive-color="#13ce66"
			/>
		</div>
		<div class="Login">
			<div :class="{ swValue: isActive }" class="tranf">
				<div class="front">
					<h2 style="position: relative; top: 50px">教室系统</h2>
					<user-info @login-sub="submitForm"></user-info>
				</div>
				<div class="back">
					<h2 style="position: relative; top: 50px">欢迎注册</h2>
					<user-info
						showCheck
						@register-sub="submitFormTow"
					></user-info>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import UserInfo from "../components/UserInfo.vue";
import { loginInReq, loginInReqRegister } from "./service.js";
// import http from "../common/http.js";
// import axios from "axios";
export default {
	name: "Login",
	components: {
		UserInfo,
	},
	data() {
		return {
			requestData: {},
			isActive: false,
		};
	},
	methods: {
		submitForm(params) {
			loginInReq(params.id, params.password).then(
				(res) => {
					if (res.data === "登录失败") {
						this.$message.error("登录失败");
					} else {
						this.$message.success("登录成功");
						this.$store.commit("resData", res.data.studentInfo);
						this.$store.commit("resDataT", res.data.classInfo);
						setTimeout(() => {
							this.$router.push("/Home");
						}, 1000);
					}
					//this.$store.commit("resData", res);
				},
				(err) => {
					this.$message.error("请求失败");
				}
			);
		},
		submitFormTow(params) {
			loginInReqRegister(params.name, params.password).then(
				(res) => {
					console.log(res);

					if (res.data === "注册失败") {
						this.$message.error("注册失败");
					} else {
						this.$message.success("注册成功");
						this.$store.commit("resData", res.data.studentInfo);
						this.$store.commit("resDataT", res.data.classInfo);
						setTimeout(() => {
							this.$router.push("/Home");
						}, 1000);
					}
					//this.$store.commit("resData", res);
				},
				(err) => {
					this.$message.error("请求失败");
				}
			);
		},
	},
};
</script>

<style>
.Login {
	width: 30%;
	height: 40%;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	margin: auto;
	min-width: 500px;
	max-width: 500px;
	min-height: 500px;
	max-height: 500px;

	perspective: 800px;
}
.front {
	backface-visibility: hidden;
	height: 500px;
	width: 500px;
	z-index: 1;
	position: absolute;
}
.back {
	transform: rotateY(180deg);
	backface-visibility: hidden;
	height: 500px;
	width: 500px;
}
.switch {
	outline: none;
	color: rgb(47, 255, 64);
	position: absolute;
	top: 10%;
	left: 48%;
}
.el-popper {
	display: none;
}
.swValue {
	transform: rotateY(180deg);
}
.tranf {
	height: 500px;
	transition: 1s;
	transform-style: preserve-3d;
	box-shadow: 0 0px 9px rgb(138, 182, 248);
	border-radius: 5%;
}
</style>
