
import {Box, Heading} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
const VideoList = ({videos}) => {
   const navigate = useNavigate()
  return (
    <div>
        {videos.map(video => {
            return (
                <Box key={video._id} onClick={() => navigate(`${video._id}`)}>
                    <Heading size={'md'}>{video.title}</Heading>
                    <Heading size={'sm'}>{video.educator}</Heading>
                </Box>
            )
        })}
      
    </div>
  )
}

export  {VideoList}
