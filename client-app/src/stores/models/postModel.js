import axios from "axios";
import { API_URL } from "../../api/agent.js";
import { toast } from "react-toastify";

export const postModel = {
  state: {
    post: null,
    postLike: 0,
    postList: [],
    postTag: [],
  },
  reducers: {
    setPost(state, payload) {
      return {
        ...state,
        post: payload,
      };
    },
    setPostList(state, payload) {
      return {
        ...state,
        postList: payload,
      };
    },
    setPostLike(state, payload) {
      return {
        ...state,
        postLike: payload,
      };
    },
    setPostTag(state, payload) {
      return {
        ...state,
        postTag: payload,
      };
    },
  },
  effects: (dispatch) => ({
    //payload: post's id
    async getPostById(payload, rootState) {
      await axios.get(`${API_URL}/posts/${payload}`).then(
        (response) => {
          dispatch.postModel.setPost(response.data);
        },
        () => toast.error("Failed to fetch data!")
      );
    },
    //payload: OData query
    async getPostList(payload, rootState) {
      await axios.get(`${API_URL}/posts` + payload).then(
        (response) => {
          dispatch.postModel.setPostList(response.data.value);
        },
        () => toast.error("Failed to fetch data!")
      );
    },
    //payload: OData query
    async getPostLikes(payload, rootState) {
      await axios.get(`${API_URL}/PostLikes` + payload).then(
        (response) => {
          dispatch.postModel.setPostLike(response.data);
        },
        () => toast.error("Failed to fetch data!")
      );
    },
    //payload: OData query
    async getPostTags(payload, rootState) {
      await axios.get(`${API_URL}/PostTagMaps` + payload);
    },
    //payload: Post's id, description
    async bookmarkPost(payload, rootState) {
      await axios.post(`${API_URL}/Bookmarks`, payload);
    },
    //payload: Post's id, User's id
    async removeBookmark(payload, rootState) {
      await axios.delete(`${API_URL}/Bookmarks/${payload}`);
    },
    //payload: OData query
    async getBookmarkPost(payload, rootState) {
      await axios.get(
        `${API_URL}/Bookmarks/PostID=${payload.PostID},UserID=${payload.UserID}`
      );
    },
    //payload: Post's id, User's id
    async getCurrentPostLike(payload, rootState) {
      await axios.get(
        `${API_URL}/PostLikes/PostID=${payload.PostID},UserID=${payload.UserID}`
      );
    },
    async likePost(payload, rootState) {
      await axios.post(`${API_URL}/PostLikes`, payload);
    },
    async removeLike(payload, rootState) {
      await axios.delete(`${API_URL}/PostLikes/${payload}`);
    },
  }),
};
