

import React, { useState } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';

const pages = [
    { id: 1, to: "/", name: "Home" },
    // { id: 2, to: "/about", name: "About" },
    { id: 3, to: "/courses", name: "Courses" },
    // { id: 4, to: "/login", name: "Login" },
    { id: 4, to: "/profile", name: "Profile" },
];

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginClick = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={5} boxShadow='base' bg='white' >
                <Image width={"150px"} height={"30px"} src='/logo.png' alt='logo' />
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
                <NavLink
                    to={isLoggedIn ? "/logout" : "/login"}
                    onClick={handleLoginClick}
                    style={{
                        display: "inline-block",
                        padding: "8px 20px",
                        // backgroundColor: "#196ae5",
                        color: "#196ae5",
                        fontWeight: "600",
                        // color: "white",
                        textDecoration: "none",
                        borderRadius: "5px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        transition: "box-shadow 0.3s",
                    }}
                >
                    {isLoggedIn ? "Logout" : "Login"}
                </NavLink>
            </Box>
        </>
    )
}

export default Navbar;

