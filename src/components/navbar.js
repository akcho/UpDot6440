import { Box, Center, Container, Flex, Spacer } from "@chakra-ui/core";
import React from "react";
import AddNewPost from "./add-new-post";
import Register from "./register";
import logo from './logo2.png'
import style from '../lib/style.css'

const Navbar = () => {
    return (
        <Box position="sticky" top={0} p={4} zIndex={1}>
            <Flex>
                <Center w="125px">
                    <img src={logo}/>
                </Center>
                <Spacer />
                <Center w="150px">
                    <Register />
                </Center>
                <Center w="150px">                
                    <AddNewPost />
                </Center>
                
            </Flex>
        </Box>
    );
};

export default Navbar;