import http from "../common/http.js";

export const loginInReq = (name, password) => {
	return http.get("/Home/Login", { params: { name, password } });
};

export const loginInReqRegister = (name, password) => {
	return http.get("/Home/Registered", { params: { name, password } });
};

export const deleteUser = (name) => {
	return http.get("/Home/deleteUser", {params: { name: name }})
}

export const upData = (id, name, password, picture) => {
	return http.get("/Home/ModifyStudent", {
		params: { id, name, password, picture },
	});
};

export const roomAppiont = (id, classRoomName) => {
	return http.get("/Home/OrderClassroom", {
		params: { id, classRoomName },
	});
};

export const AddRoom = (classRoomName) => {
	return http.get("/Home/AddClassroom", {
		params: { classRoomName },
	});
};

export const UpdataRoom = (id, classRoomName) => {
	return http.get("/Home/ModifyClassroom", {
		params: { id, classRoomName },
	});
};
