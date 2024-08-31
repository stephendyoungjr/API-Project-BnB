import { csrfFetch } from "./csrf";
const GET_REVIEWS = "get/allReviews";
const DELETE_ONE_REVIEW = "delete/oneReivew";
const CREATE_REVIEW = "create/oneReview";
//action

const getReview = (reviews) => {
  return {
    type: GET_REVIEWS,
    payload: reviews,
  };
};

const createOneReview = (review) => {
  return {
    type: CREATE_REVIEW,
    payload: review,
  };
};
const deleteOneReview = (reviewId) => {
  return { type: DELETE_ONE_REVIEW, payload: reviewId };
};

//Thunk

export const getAllReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    // console.log("Thunk--->", reviews);
    dispatch(getReview(reviews));
    return reviews;
  }
};

export const createReview = (spotId, review) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (response.ok) {
    const reviewObj = await response.json();
    dispatch(createOneReview(reviewObj));
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteOneReview(reviewId));
  }
};
//reducer
const initialState = { reviews: null };
const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      return { ...state, reviews: action.payload };
    }
    case CREATE_REVIEW: {
      const newState = { ...state };
      // console.log("before -->just state", state);
      newState[action.payload.id] = action.payload;
      // console.log("after -->newState", newState);
      // console.log("after-->action payload", action.payload);
      return newState;
    }
    case DELETE_ONE_REVIEW: {
      const updatedReviews = state.reviews.filter(
        (review) => review.id !== action.payload
      );
      return {
        ...state,
        reviews: updatedReviews,
      };
    }
    default:
      return state;
  }
};
export default reviewReducer;