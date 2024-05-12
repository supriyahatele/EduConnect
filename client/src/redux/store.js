import {applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { OneCourseReducer, courseReducer } from './reducers'
import {thunk} from "redux-thunk";

const rootReducer=combineReducers({
    Courses:courseReducer,
    singleCourse:OneCourseReducer
})
export const store= legacy_createStore(rootReducer,applyMiddleware(thunk))
 