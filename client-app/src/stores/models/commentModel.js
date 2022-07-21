import axios from "axios";
import { API_URL } from "../../api/agent.js";
import { toast } from "react-toastify";

export const commentModel = {
    state: {
        commentList: [],
    },
    reducers: {
        setCommentList(state, payload) {
            return {
                ...state,
                commentList: payload,
            }
        },
    },
    effects: (dispatch) => ({

    })
}