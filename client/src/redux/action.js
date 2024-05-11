import {  FetchCourseFailure, FetchCourseLoading, FetchCourseSuccess,  PostCourseSuccess } from "./actionTypes"
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


 export const getCourses=()=>{
   return  async (dispatch)=>{
    dispatch({type:FetchCourseLoading})
    try {
        let res= await  axios.get("http://localhost:3000/courses/")
        console.log(res.data)
        dispatch({type:FetchCourseSuccess,payload:res.data})
    } catch (error) {
        dispatch({type:FetchCourseFailure})
    }
   }
 }


 export const editTodo=(payload)=> {
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