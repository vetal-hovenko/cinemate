import { applyMiddleware, combineReducers, createStore } from "redux";
import { moviesReducer } from "./reducers/moviesReducer/moviesReducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    movies: moviesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
