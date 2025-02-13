import axios from "axios";
import { BASE_URL } from "../helpers/constants";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

axios.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.authorization = "Bearer " + token;
    }
    return req;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error?.response && error?.response?.data) {
            if (error.response.headers["content-type"]?.includes("text/html")) {
                error.message = "Unexpected HTML response from the server.";
            } else {
                error.message = error?.response?.data || "An error occurred";
            }
        }

        console.error("Axios Error:", error);

        return Promise.reject(error);
    }
);

export default axios;
