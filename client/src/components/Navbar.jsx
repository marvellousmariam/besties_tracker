import { Box, Button, Container, Flex, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import{ IoMoon, IoMoonOutline } from 'react-icons/io5'
import {LuSun} from 'react-icons/lu'
import CreateUser from './CreateUser'

const Navbar = ({setUsers}) => {
    const {colorMode, toggleColorMode}=useColorMode();
  return (
   <Container maxW={"900px"}>
    <Box  px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200","gray.700")}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Flex alignItems={"center"} justifyContent={"center"} gap={3} display={{base:"none",sm:"flex"}}>
                <Text fontSize={"40px"}>👩</Text>   
                <Text fontSize={"40px"}>+</Text>
                <Text fontSize={"40px"}>👩‍🦰</Text>   
                <Text fontSize={"40px"}>=</Text>
                <Text fontSize={"60px"}>👩‍❤️‍👩</Text>
            </Flex>
            <Flex gap={3} alignItems={"center"}>
            <Text fontSize={"lg"} fontWeight={500} display={{base:"none",md:" block"}}> Besties 🔥</Text> 
            <Button onClick={toggleColorMode}>
                {colorMode === "light"?<IoMoonOutline/>:<LuSun size={20}/>}
            </Button>
            <CreateUser setUsers={setUsers}/>
           </Flex>
        </Flex>
    </Box>
   </Container>
  )
}

export default Navbar
