export const user = {
    state: 0,
    reducers: {
        changeState(state, payload) {
            return state += payload;
        }
    },
    effects: (dispatch) => ({
        async changeStateAsync(payload, rootState) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            dispatch.user.changeState(payload);
        }
    })
}