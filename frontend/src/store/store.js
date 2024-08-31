import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import sessionReducer from "./session";
import spotsReducer from "./spot";
import reviewReducer from "./reviews";

//reducer add here, format as
//{xxState:xxReducer, yyState:yyReducer}  only in 1 object
const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewReducer,
  // Example:
  // auth: authReducer,
  // todos: todosReducer,
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};
export default configureStore;


// import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import sessionReducer from './session';
// import spotReducer from './spot';


// const rootReducer = combineReducers({
//   // ADD REDUCERS HERE
//   session: sessionReducer,
//   spots: spotReducer,
// });

// let enhancer;
// if (import.meta.env.MODE === "production") {
//   enhancer = applyMiddleware(thunk);
// } else {
//   const logger = (await import("redux-logger")).default;
//   const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   enhancer = composeEnhancers(applyMiddleware(thunk, logger));
// }

// const configureStore = (preloadedState) => {
//   return createStore(rootReducer, preloadedState, enhancer);
// };

// export default configureStore;