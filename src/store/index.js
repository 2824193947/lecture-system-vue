import { createStore } from "vuex";
import LocalStorage from "../utils/store"

// 创建一个新的 store 实例
const store = createStore({
	state() {
		return {
			studentdata: LocalStorage.getLocalstore("studentInfo"),
			classroomdata: LocalStorage.getLocalstore("classInfo"),
		};
	},
	mutations: {
		resData(state, params) {
			state.studentdata = params;
		},
		resDataT(state, params) {
			state.classroomdata = params;
		},
	},
});

export default store;
