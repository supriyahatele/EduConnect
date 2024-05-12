import {  FETCH_QUIZ_FAILURE, FETCH_QUIZ_REQUEST, FETCH_QUIZ_SUCCESS, FetchCourseFailure, FetchCourseLoading, FetchCourseSuccess,  PostCourseSuccess } from "./actionTypes"
import  axios from "axios"

export const postCourse= (payload)=> {
   return async (dispatch)=>{
    dispatch({type:FetchCourseLoading})
    try{
         await  axios.post("http://localhost:8080/todo",payload) 

        // dispatch({type:PostCourseSuccess, payload:res.data})
        // getCourses()
        dispatch(getCourses())
    }catch(e){
        dispatch({type:FetchCourseFailure})   
    }
    
    }
    
}


 export const getCourses=(page,search,sortBy,sortOrder)=>{
   return  async (dispatch)=>{
    dispatch({type:FetchCourseLoading})
    try {
        let url = `http://localhost:3000/courses/?page=${page}&search=${search}`;
      if (sortBy) {
        url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
      }
        let res= await  axios.get(url)
        console.log(res.data.courseData)
        dispatch({type:FetchCourseSuccess,payload:res.data.courseData})
    } catch (error) {
        dispatch({type:FetchCourseFailure})
    }
   }
 }


 export const editCourse=(payload)=> {
    return  async (dispatch)=>{
        dispatch({type:FetchCourseLoading})
        try{
             await  axios.patch(`http://localhost:8080/todo/${payload.id}`,payload)
    
            dispatch(getCourses())
            console.log(payload)
        }catch(e){
            dispatch({type:FetchCourseFailure})   
        }
        
        }
       
 }
  
    
    export const deleteTodo=(id)=> 
    async (dispatch)=>{
    dispatch({type:FetchCourseLoading})
    try{
         await  axios.delete(`http://localhost:8080/todo/${id}`)
        dispatch(getCourses())
    }catch(e){
        dispatch({type:FetchCourseFailure})   
    }
    }

    export const getQuizData=()=>{
        return async(dispatch)=>{
            dispatch({type:FETCH_QUIZ_REQUEST})
            try{
                const res= await axios.get("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-quiz")
                dispatch({type:FETCH_QUIZ_SUCCESS,payload:res.data})
                console.log(res.data)
            }catch(e){
                dispatch({type:FETCH_QUIZ_FAILURE})
            }
        }
     }