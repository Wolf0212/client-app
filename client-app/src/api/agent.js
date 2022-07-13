import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(undefined, function(error) {
    if (error.message === "Network Error" && !error.response) {
        toast.error("Network error - Make sure API is running properly");
    }
});

axios.defaults.headers.common["Authorization"] = "Bearer" + localStorage.token;

export default API_URL = "http://localhost:5001/odata";