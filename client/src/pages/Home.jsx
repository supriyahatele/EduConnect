import { useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContextProvider'

function Home() {
  const {authUser} = useContext(AuthContext);
  console.log(authUser);
  return (

    <div>
      
      Home
    </div>
  )
}

export default Home
