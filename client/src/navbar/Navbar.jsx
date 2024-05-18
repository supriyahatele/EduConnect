

import React, { useContext, useState } from 'react';
import { Box, Button, Image } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContextProvider';

const pages = [
    { id: 1, to: "/", name: "Home" },
    { id: 2, to: "/mycourses", name: "MyCourses" },
    { id: 3, to: "/courses", name: "Courses" },
    { id: 4, to: "/quiz", name: "Quiz" },
    { id: 5, to: "/profile", name: "Profile" },
];

function Navbar() {
  const {authUser,logoutUser} = useContext(AuthContext)
  const [isActive, setIsActive] = useState(false);
  
  const defaultStyle = { color: 'Black' ,fontWeight: "600" };
  const activeStyle= { color: "#196ae5",fontWeight: "600",borderBottom : '1px solid #196ae5' }; 
    return (
        <>
        <div className="navbar">
            <div
            className={`hamburger-menu ${isActive ? "active" : null}`}
            onClick={() => {
              
            setIsActive((prev) => !prev);
            }}
            >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
            </div>
            <div className={`navbar-inner ${isActive ? "active" : null}`}>
                <Image width={{base : "100px",md : "150px" }} height={{base : "25px",md : "30px"}} src='/logo.png' alt='logo' />
                {/* <Text fontWeight={800} color={"#196ae5"}>EDU CONNECT...</Text> */}
                {pages.map((el) => (
                    <NavLink
                         onClick={() => {
                        setIsActive((prev) => !prev);
                         }}
                        key={el.id}
                        to={el.to}
                        style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
                    >
                        {el.name}
                    </NavLink>
                ))}
                {authUser.token ? <Button
                    onClick={()=>{
                      setIsActive((prev) => !prev);
                        logoutUser()
                    }}
                    style={{
                        display: "inline-block",
                        padding: "8px 20px",
                        color: "#196ae5",
                        fontWeight: "600",
                        textDecoration: "none",
                        borderRadius: "5px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        transition: "box-shadow 0.3s",
                    }}
                >
                    Logout
                </Button> : <NavLink to='/login' onClick={() => {
                        setIsActive((prev) => !prev);
                         }}  
                         style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
                         >Login</NavLink>}
            </div>
            </div>
        </>
    )
}

export default Navbar;

