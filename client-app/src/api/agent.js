import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(undefined, function (error) {
    if (error.response.status === 400) {
        toast.error("Check your input again!");
    }
    if (error.response.status === 401) {
        toast.error("Invalid credentials!");
    }
    throw error;
});

axios.defaults.headers.common["Authorization"] = "Bearer" + localStorage.token;

export const API_URL = "https://localhost:44321/odata";