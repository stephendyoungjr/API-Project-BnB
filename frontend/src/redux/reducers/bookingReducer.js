
const initialState = {
    bookings: [],
    loading: false,
    error: null,
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_BOOKING_REQUEST':
            return { ...state, loading: true };
        case 'CREATE_BOOKING_SUCCESS':
            return { ...state, loading: false, bookings: [...state.bookings, action.payload] };
        case 'CREATE_BOOKING_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'FETCH_BOOKINGS_SUCCESS':
            return { ...state, bookings: action.payload };
        case 'CANCEL_BOOKING_SUCCESS':
            return {
                ...state,
                bookings: state.bookings.filter(booking => booking.id !== action.payload),
            };
        default:
            return state;
    }
};

export default bookingReducer;
