
import  { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContextProvider'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {authUser} = useContext(AuthContext)
  
   return authUser.token ? children : <Navigate to={'/'}/>
}

export  {PrivateRoute}
