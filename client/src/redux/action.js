import {  FETCH_QUIZ_FAILURE, FETCH_QUIZ_REQUEST, FETCH_QUIZ_SUCCESS, FetchCourseFailure, FetchCourseLoading, FetchCourseSuccess,  AddCourseSuccess } from "./actionTypes"
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
        // console.log(res.data.courseData)
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

    export const getQuizData=(token)=>{
        return async(dispatch)=>{
            dispatch({type:FETCH_QUIZ_REQUEST})
            try{
                const res= await axios.get("http://localhost:3000/quiz/getQuiz",{
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                dispatch({type:FETCH_QUIZ_SUCCESS,payload:res?.data?.quiz})
                // console.log(res?.data.quiz)
            }catch(e){
                dispatch({type:FETCH_QUIZ_FAILURE})
            }
        }
     }