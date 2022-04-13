import axios from "axios";

const http = axios.create({
	baseURL: "http://10.0.7.102:8888/ClassroomSystem_war",
	timeout: 5000,
	headers: {},
});

export default http;
