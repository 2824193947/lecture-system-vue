import { createStore } from "vuex";

// 创建一个新的 store 实例
const store = createStore({
	state() {
		return {
			studentdata: {},
			classroomdata: {},
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
