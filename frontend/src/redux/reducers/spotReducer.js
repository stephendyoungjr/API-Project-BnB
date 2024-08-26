
const initialState = {
    spots: [],
    loading: false,
    error: null,
};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_SPOTS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SPOTS_SUCCESS':
            return { ...state, loading: false, spots: action.payload };
        case 'FETCH_SPOTS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'CREATE_SPOT_SUCCESS':
            return { ...state, spots: [...state.spots, action.payload] };
        case 'UPDATE_SPOT_SUCCESS':
            return {
                ...state,
                spots: state.spots.map(spot =>
                    spot.id === action.payload.id ? action.payload : spot
                ),
            };
        case 'DELETE_SPOT_SUCCESS':
            return {
                ...state,
                spots: state.spots.filter(spot => spot.id !== action.payload),
            };
        default:
            return state;
    }
};

export default spotReducer;
