
import { Link, useParams } from 'react-router-dom'

const SingleCourse = () => {
   const {id} = useParams()
   
  return (
    <div>
      <div>single course</div>
      {id}
      <br />
      <Link to='assignments'>Assignment</Link>
    
       <Link to='videos'>videos</Link>
    </div>
  )
}

export default SingleCourse
