import { createContext, useEffect, useState } from "react"
import { jwtDecode } from 'jwt-decode'
const InitialAuthState = {
    username : '',
    token : '',
    role:'',

}
export const AuthContext = createContext();
const AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(InitialAuthState);
    useEffect(()=>{
       const token =  localStorage.getItem('token');
       if(token){
        const decode = jwtDecode(token);
        console.log(decode);
        setAuthUser(prev => ({
            ...prev,
            token : token,
            username : decode.username,
            role : decode.role,
        }))
       }
    },[])
    const loginUser = (token) => {

        localStorage.setItem('token',token);
        const decode = jwtDecode(token);
        setAuthUser(prev => ({
            ...prev,
            token : token,
            username : decode.username,
            role : decode.role,
        }))
    }
   const logoutUser = () => {
    localStorage.removeItem('token');
    setAuthUser(InitialAuthState)
   }
  return (
    <AuthContext.Provider value={{authUser,loginUser,logoutUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export  { AuthContextProvider }
