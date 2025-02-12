import axios from "axios";
import { BASE_URL } from "../helpers/constants";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;
axios.interceptors.request.use((req) => {
    if (localStorage.getItem("token")) {
        req.headers.authorization = "Bearer " + localStorage.getItem("token");
    }
    return req;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response && error?.response?.data) {
            error.message = error?.response?.data || "An error occurred";
        }

        return Promise.reject(error);
    }
);

export default axios;
