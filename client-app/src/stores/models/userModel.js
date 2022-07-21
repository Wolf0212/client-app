import axios from "axios";
import { API_URL } from "../../api/agent.js";
import { toast } from "react-toastify";

export const userModel = {
    state: {
        user: null,
    },
    reducers: {
        setUser(state, payload) {
            return {
                ...state,
                user: (state.user = payload),
            }
        }
    },
    effects: (dispatch) => ({
        async getUser(payload, rootState) {
            await axios.get(`${API_URL}/users/${localStorage.getItem('uid')}`).then((response) => {
                dispatch.userModel.setUser(response.data);
            })
        },
        async updateUser(payload, rootState) {
            await axios.patch(`${API_URL}/users/${localStorage.getItem('uid')}`, payload).then(() => {
                toast.success("Succesfully updated your profile");
            })
            this.getUser();
        }
    })
}