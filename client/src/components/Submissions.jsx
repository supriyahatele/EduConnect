
import {  useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import {AuthContext}  from '../Contexts/AuthContextProvider'
const Submissions = () => {
    const id = useParams();
    const {authUser} = useContext(AuthContext)
    const [submissions,setSubmissions] = useState();
    const [loading,setLoading] = useState(false);
    const [isError,setIsError] = useState(false);
    useEffect(()=>{
      axios.get('/submissions',{
        headers : {
          'Authorization' : `Bearer ${authUser.token}`
        }
      })
      .then((res) => {
        setSubmissions(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    },[id,authUser])
  return (
    <div>
      {id}
    </div>
  )
}

export  {Submissions}
