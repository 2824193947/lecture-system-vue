import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Updata from "../components/Updata.vue";
import Add from "../components/Add.vue";
import reClassRoom from "../components/reClassRoom.vue";
import AddClassRoom from "../components/AddClassRoom.vue";
import UpdataRoom from "../components/UpdataRoom.vue";
import MyData from "../components/MyData.vue";
import AddLcture from "../components/AddLcture.vue";
import QueryLecture from "../components/QueryLecture.vue";
import UpdateLecture from "../components/UpdateLecture.vue";
import SelectUser from "../components/SelectUser.vue";
import Appointment from "../components/Appointment.vue";
import Dign from "../components/Dign.vue";
const routes = [
	{ path: "/", component: Login },
	{
		path: "/Home",
		component: Home,
		children: [
			{ path: "Updata", component: Updata },
			{ path: "Add", component: Add },
			{ path: "reClassRoom", component: reClassRoom },
			{ path: "AddClassRoom", component: AddClassRoom },
			{ path: "UpdataRoom", component: UpdataRoom },
			{ path: "MyData", component: MyData },
			{ path: "AddLcture", component: AddLcture },
			{ path: "QueryLecture", component: QueryLecture },
			{ path: "UpdateLecture", component: UpdateLecture },
			{ path: "SelectUser", component: SelectUser },
			{ path: "Appointment", component: Appointment },
			{ path: "Dign", component: Dign },
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
