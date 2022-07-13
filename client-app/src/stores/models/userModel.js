export const userModel = {
    state: {
        count: 0,
    },
    reducers: {
        incrementCount(state, payload) {
            return {
                ...state,
                count: state.count + payload,
            };
        }
    },
    effects: (dispatch) => ({
        async incrementCountAsync(payload, rootState) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(payload)
            dispatch.userModel.incrementCount(payload);
        }
    })
}