import React from 'react'
import { AssignmentCard } from './AssignmentCard'

const AssignmentList = ({assignments,handleDelete}) => {
  
  return (
    <div>
        {assignments?.map((assignment) => {

            return <AssignmentCard key={assignment._id} assignment={assignment} handleDelete={handleDelete} />
        })}
      
    </div>
  )
}

export  {AssignmentList}
