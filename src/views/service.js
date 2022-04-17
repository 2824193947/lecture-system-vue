import http from "../common/http.js";

export const loginInReq = (name, password) => {
	return http.get("/Home/Login", { params: { name, password } });
};

export const loginInReqRegister = (name, password) => {
	return http.get("/Home/Registered", { params: { name, password } });
};

export const deleteUser = (name) => {
	return http.get("/Home/deleteUser", { params: { name: name } })
}

export const upData = (id, phoneNumber, mail, age, youName, gender, complete, password, name) => {
	return http.get("/Home/ModifyStudent", {
		params: { id, phoneNumber, mail, age, youName, gender, complete, password, name},
	});
};

export const roomAppiont = (id, classRoomName) => {
	return http.get("/Home/OrderClassroom", {
		params: { id, classRoomName },
	});
};

export const AddRoom = (classRoomName, floor, classroomNumber) => {
	return http.get("/Home/AddClassroom", {
		params: { classRoomName, floor, classroomNumber },
	});
};

export const UpdataRoom = (classRoomName, floor, classroomNumber) => {
	return http.get("/Home/ModifyClassroom", {
		params: { classRoomName, floor, classroomNumber },
	});
};

export const DeleteClassRoom = (classroomname) => {
	return http.get("/Home/deleteClassroom", {
		params: { classroomname },
	});
};

export const AllClassRoom = () => {
	return http.get("/Home/allClassRoom");
};

export const AddLcture = (lectureinfo, classroomname, date) => {
	return http.get("/Home/addleature", {
		params: { lectureinfo, classroomname, date },
	});
};

export const SelectLecture = () => {
	return http.get("/Home/selectlecture", {});
};

export const UpdateLecture = (lectureinfo, classroomname) => {
	return http.get("/Home/updateleature", {
		params: { lectureinfo, classroomname }
	});
};

export const DeleteLecture = (lectureinfo) => {
	return http.get("/Home/deleteleature", {
		params: { lectureinfo }
	});
};

export const SelectUser = () => {
	return http.get("/Home/selective");
};

export const ModifyRole = (name, role) => {
	return http.get("/Home/modifyRole", {
		params: { name, role }
	});
};

export const SelectLectureClass = (classroomname) => {
	return http.get("/Home/selectlectureclass", {
		params: { classroomname }
	});
};

export const AddAppointment = (name, classroomname, lectureinfo, date, sign) => {
	return http.get("/Home/addappointment", {
		params: {
			name,
			classroomname,
			lectureinfo,
			date,
			sign
		}
	});
};

export const SelectAppointment = (name) => {
	return http.get("/Home/selectappointment", {
		params: { name }
	});
};

export const UpdateAppointment = (sign, classroomname, lectureinfo, date) => {
	return http.get("/Home/updateappointment", {
		params: { sign, classroomname, lectureinfo, date }
	});
};

export const addApply = (name, role) => {
	return http.get("/Home/addApply", {
		params: { name, role }
	});
};

export const queryApply = () => {
	return http.get("/Home/queryApply", {});
};

export const deleteApply = (name) => {
	return http.get("/Home/deleteApply", {
		params: { name }
	});
};