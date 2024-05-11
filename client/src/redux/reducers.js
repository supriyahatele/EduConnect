
import { FetchCourseFailure, FetchCourseLoading, FetchCourseSuccess, PostCourseSuccess } from "./actionTypes";

const initialValue = {
    isLoading: false,
    isError: false,
    courses: []
}
 export const courseReducer = (state = initialValue, { type, payload }) => {
    switch (type) {
        case FetchCourseLoading:
            return { ...state, isLoading: true }
        case FetchCourseSuccess:
            return { ...state, isLoading: false, courses: payload }
        case FetchCourseFailure:
            return { ...state, isLoading: false, isError: true, courses: [] }
            case PostCourseSuccess:
                return{
                    ...state,
                    isLoading:false,
                    isError: false,
                    courses: [...courses,payload]
            } 
        default:
            return state;
    }
} 