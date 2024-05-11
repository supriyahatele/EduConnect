
import { Box } from '@chakra-ui/react'
import {Link} from 'react-router-dom'

const pages = [
    { id: 1, to: "/", name: "Home" },
    { id: 2, to: "/about", name: "About" },
    { id: 3, to: "/courses", name: "Courses" },
    { id: 4, to: "/login", name: "Login" },
    { id: 5, to: "/profile", name: "Profile" },
]

function Navbar() {
    return (
        <>
            <Box>
                {pages.map((el)=>(
                    <Link key={el.id} to={el.to}>{el.name}</Link>
                ))}
            </Box>
        </>
    )
}

export default Navbar
