
const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { ...state, loading: true };
        case 'LOGIN_SUCCESS':
            return { ...state, loading: false, isAuthenticated: true, user: action.payload };
        case 'LOGIN_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, user: null };
        default:
            return state;
    }
};

export default userReducer;
