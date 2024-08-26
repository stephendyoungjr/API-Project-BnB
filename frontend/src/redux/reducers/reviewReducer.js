
const initialState = {
    reviews: [],
    loading: false,
    error: null,
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_REVIEWS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_REVIEWS_SUCCESS':
            return { ...state, loading: false, reviews: action.payload };
        case 'FETCH_REVIEWS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'CREATE_REVIEW_SUCCESS':
            return { ...state, reviews: [...state.reviews, action.payload] };
        case 'DELETE_REVIEW_SUCCESS':
            return {
                ...state,
                reviews: state.reviews.filter(review => review.id !== action.payload),
            };
        default:
            return state;
    }
};

export default reviewReducer;
