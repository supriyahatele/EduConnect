
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Courses from '../pages/Courses'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Signup from '../pages/Signup'
import { SingleCourse } from '../pages/SingleCourse'
import { SingleAssignment } from '../components/Assignments/SingleAssignment'
import { Videos } from '../pages/Videos'

import SingleVideo from '../components/Videos/SingleVideo'
import { Assignments } from '../pages/Assignments'
import { PrivateRoute } from './PrivateRoute'

function Allroutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:id" element={<SingleCourse />} />

                <Route path='/courses/:id/assignments' element={<PrivateRoute>
                    <Assignments />
                </PrivateRoute>} />
                <Route path='/courses/:id/assignments/:assignment_id' element={<SingleAssignment />} />
                <Route path='/courses/:id/videos/:video_id' element={<SingleVideo />} />
                <Route path='/courses/:id/videos' element={<PrivateRoute>
                    <Videos />
                </PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
    )
}

export default Allroutes
