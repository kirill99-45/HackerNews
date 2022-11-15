import { combineReducers } from "redux";
import { NewsPageReducer } from "./news-page-reducer";
import { HomePageReducer } from './home-page-reducer'

export const rootReducer = combineReducers({
    NewsPageReducer,
    HomePageReducer,
})