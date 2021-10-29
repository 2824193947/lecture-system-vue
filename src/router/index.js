import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Updata from "../components/Updata.vue";
import Add from "../components/Add.vue";
import reClassRoom from "../components/reClassRoom.vue";
import AddClassRoom from "../components/AddClassRoom.vue";
import UpdataRoom from "../components/UpdataRoom.vue";
import MyData from "../components/MyData.vue";
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
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
