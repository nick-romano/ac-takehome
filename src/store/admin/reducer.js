

export const reducer = (state, action) => {
    switch(action.type) {
        case 'setUser':
            return {
                ...state,
                user: action.user
            }
        default:
            throw new Error("unknown action dispatched to admin reducer");
    }
}
