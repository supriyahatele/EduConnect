

import React, { useContext, useState } from 'react';
import { Box, Button, Image } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContextProvider';

const pages = [
    { id: 1, to: "/", name: "Home" },
    { id: 2, to: "/mycourses", name: "MyCourses" },
    { id: 2, to: "/courses", name: "Courses" },
    // { id: 4, to: "/login", name: "Login" },
    { id: 3, to: "/profile", name: "Profile" },
];

function Navbar() {
  const {authUser,logoutUser} = useContext(AuthContext)

    return (
        <>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={5} boxShadow='base' bg='white' position="sticky"
      top="0"
      zIndex="sticky"
      backgroundColor="white"
    //   boxShadow="base"
    //   p={5}
      >
                <Image width={{base : "100px",md : "150px" }} display={{base:'none', md : 'inline-block'}} height={{base : "10px",md : "30px"}} src='/logo.png' alt='logo' />
                {/* <Text fontWeight={800} color={"#196ae5"}>EDU CONNECT...</Text> */}
                {pages.map((el) => (
                    <NavLink
                        key={el.id}
                        to={el.to}
                        style={({ isActive }) => ({
                            color: isActive
                                ? "#196ae5"
                                : "Black",
                            fontWeight: "600",
                        })}
                    >
                        {el.name}
                    </NavLink>
                ))}
                {authUser.token ? <Button
                    onClick={()=>logoutUser()}
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
                </Button> : <NavLink to='/login'  style={({ isActive }) => ({
                            color: isActive
                                ? "#196ae5"
                                : "Black",
                            fontWeight: "600",
                        })}>Login</NavLink>}
            </Box>
        </>
    )
}

export default Navbar;

