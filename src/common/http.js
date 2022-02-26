import axios from "axios";

const http = axios.create({
	baseURL: "http://192.168.31.167:8888/ClassroomSystem_war",
	timeout: 5000,
	headers: {},
});

export default http;
