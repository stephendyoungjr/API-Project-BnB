
const initialState = {
  spotImages: [],
  loading: false,
  error: null,
};

const spotImageReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'UPLOAD_IMAGE_SUCCESS':
          return { ...state, spotImages: [...state.spotImages, action.payload] };
      case 'DELETE_IMAGE_SUCCESS':
          return {
              ...state,
              spotImages: state.spotImages.filter(image => image.id !== action.payload),
          };
      default:
          return state;
  }
};

export default spotImageReducer;
