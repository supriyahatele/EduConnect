import {applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { courseReducer } from './reducers'
import {thunk} from "redux-thunk";

const rootReducer=combineReducers({
    Courses:courseReducer
})
export const store= legacy_createStore(rootReducer,applyMiddleware(thunk))
 