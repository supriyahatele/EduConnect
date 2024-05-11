
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Courses from '../pages/Courses'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Signup from '../pages/Signup'

function Allroutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
    )
}

export default Allroutes
