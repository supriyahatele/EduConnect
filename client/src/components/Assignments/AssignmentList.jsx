import React from 'react'
import { AssignmentCard } from './AssignmentCard'
import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const AssignmentList = ({assignments,handleDelete}) => {
  const navigate = useNavigate()
  return (
    <div>
       <Button m={2} bgColor={'blue.600'} size={'sm'} onClick={() => navigate(-1)}>Go Back</Button>
        {assignments?.map((assignment) => {

            return <AssignmentCard key={assignment._id} assignment={assignment} handleDelete={handleDelete} />
        })}
      
    </div>
  )
}

export  {AssignmentList}
