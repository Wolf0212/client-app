export const commentModel = {
  state: {
    commentList: [],
  },
  reducers: {
    setCommentList(state, payload) {
      return {
        ...state,
        commentList: payload,
      };
    },
  },
  effects: (dispatch) => ({}),
};
