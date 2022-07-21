export const globalModel = {
    state: {
        loading: true,
    },
    reducers: {
        setLoading(state, payload) {
            return {
                ...state,
                loading: (state.loading = payload),
            }
        }
    }
}