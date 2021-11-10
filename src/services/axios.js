import axios from "axios";
import { api } from "../urlConfig";

const tokenObj = JSON.parse(window.sessionStorage.getItem("token"));
const token = tokenObj ? tokenObj.token : null;
const axiosInstance = axios.create({
	baseURL: api,
	headers: {
		Authorization: token ? `Bearer ${token}` : "",
	},
});

export default axiosInstance;
