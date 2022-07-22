import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(undefined, function (error) {
  if (error.message === "Network Error") {
    toast.error("Network error - Make sure your API server is up and running");
  }
  if (error.response.status === 400) {
    if (error.response.data.value != null) {
      toast.error(error.response.data.value);
    } else {
      toast.error("Check your input again!");
    }
  }
  if (error.response.status === 401) {
    toast.error("Invalid credentials!");
  }
  console.log(error);
  throw error;
});

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export const API_URL = "https://localhost:5001/odata";
