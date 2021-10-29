import axios from "axios";

const http = axios.create({
	baseURL: "http://42.194.168.97:8081/ClassroomSystem_war",
	timeout: 5000,
	headers: {},
});

export default http;
