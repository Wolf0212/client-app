import axios from "axios";
import { API_URL } from "../../api/agent.js";
import { toast } from "react-toastify";

export const postModel = {
    state: {
        post: null,
        postList: [],
    },
    reducers: {
        setPost(state, payload) {
            return {
                ...state,
                post: (state.post = payload),
            };
        },
        setPostList(state, payload) {
            return {
                ...state,
                postList: payload,
            }
        }
    },
    effects: (dispatch) => ({
        //payload: post's id
        async getPostById(payload, rootState) {
            await axios.get(`${API_URL}/posts/${payload}`).then((response) => {
                dispatch.postModel.setPost(response.data);
                console.log(postModel.state.post);
            }, () => toast.error("Failed to fetch data!"));
        },
        //payload: OData query 
        async getPostList(payload, rootState) {
            await axios.get(`${API_URL}/posts` + payload).then((response) => {
                dispatch.postModel.setPostList(response.data.value);
            }, () => toast.error("Failed to fetch data!"));
        }
    })
}