import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { BiTrash } from 'react-icons/bi'
import EditModel from './EditModel'
import { BASE_URL } from '../App'

const UserCard = ({user,setUsers}) => {
    const toast = useToast()
    const handleDelete=async () =>{
        try {
            const res = await fetch(BASE_URL+"deletebesties/"+user.id,{
                method:"DELETE"
            })
            const data = await res.json();
            if (!res.ok){
                throw new Error(data.error)
            }
            setUsers((prevUser)=>prevUser.filter((u)=>u.id !== user.id))
            toast({
                status:"success",
                title:"Besties Discarded Successfully",
                description:"Wishing you happy hateship",
                duration:2000,
                position:"top",
                isClosable:true,
      
              });
        } catch (error) {
            toast({
                status:"error",
                title:"Still not want to be friend",
                description:"No longer friend",
                duration:2000,
                position:"bottom",
                isClosable:true,
      
              });
        }
    }
  return (
   <Card size={"lg"}>
    <CardHeader>
        <Flex gap={4}>
        <Flex flex={"1"} gap={"4"} alignItems={"center"}>
            <Avatar src={user.imgUrl}/>
            <Box>
                <Heading size='sm'>{user.name}</Heading>
               <Text>{user.role}</Text> 
            </Box>
        </Flex>

        <Flex>
            <EditModel user={user} setUsers={setUsers}/>
            <IconButton variant='ghost' colorScheme='red' size={'sm'} aria-label='See menu' icon={<BiTrash size={20}/>} onClick={handleDelete}/>
        </Flex>
        </Flex>
    </CardHeader>
    <CardBody>
        <Text>{user.description}</Text>
    </CardBody>
   </Card>
  )
}

export default UserCard
