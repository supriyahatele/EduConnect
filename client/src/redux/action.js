import {  FetchCourseFailure, FetchCourseLoading, FetchCourseSuccess,  AddCourseSuccess } from "./actionTypes"
import  axios from "axios"

export const postCourse= (payload)=> {
   return async (dispatch)=>{
        dispatch({type:FetchCourseLoading})
        console.log('payload' ,payload);
        axios.post("http://localhost:3000/courses/",payload)
        .then(res => {
            console.log('response',res.data);
            dispatch({type:AddCourseSuccess, payload:res.data})
        }) 
        .catch(error => {
            console.log(error);
            dispatch({type:FetchCourseFailure})   
        })
    
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