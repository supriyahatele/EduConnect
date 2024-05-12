
import  { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContextProvider'
import { Navigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
const PrivateRoute = ({children}) => {
    const toast = useToast()
   
    const {authUser} = useContext(AuthContext)
    if(authUser.token){
        return children
    }else{
        toast({
            title : 'login',
            description : 'you need to login for access',
            status : 'info',
            duration : 3000,
            isClosable:true
        })
         return <Navigate to={'/login'} />
    }
  
  
}

export  {PrivateRoute}
