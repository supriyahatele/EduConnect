import React from 'react'
import { AssignmentCard } from './AssignmentCard'

const AssignmentList = ({assignments}) => {
  return (
    <div>
        {assignments?.map((assignment) => {

            return <AssignmentCard key={assignment._id} assignment={assignment} />
        })}
      
    </div>
  )
}

export  {AssignmentList}
