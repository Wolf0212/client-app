import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(undefined, function (error) {
    console.log(error.toJSON());
    throw error;
});

axios.defaults.headers.common["Authorization"] = "Bearer" + localStorage.token;

export const API_URL = "https://localhost:44321/odata";