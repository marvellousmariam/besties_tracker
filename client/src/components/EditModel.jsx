import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import {BiAddToQueue, BiEditAlt} from "react-icons/bi"
import React, { useState } from 'react'
import { BASE_URL } from '../App'

const EditModel = ({user,setUsers}) => {
    const {isOpen,onOpen,onClose}=useDisclosure()
    const[isLoading,setIsLoading]=useState(false)
    const toast = useToast()
    const [inputs,setInputs]=useState({
      name:user.name,role:user.role,description:user.description
    })
    const  handleEdit=async (e) => {
      e.preventDefult();
      setIsLoading(true);
      try {
        const res =await fetch(BASE_URL+"besties"+user.id,{
          method:"PATCH",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(inputs)
        })
        const data = await res.json()
        if(!res.ok){
          throw new Error(data.error)
        }
        setUsers((prevUsers)=>prevUsers.map((u)=> u.id=== user.id?data:u))
        toast({
          status:"success",
          title:"Besties Updated Successfully",
          description:"Fixing You done !!",
          duration:2000,
          position:"top",
          isClosable:true,

        });
        onClose();
      } catch (error) {
        toast({
          status:"error",
          title:"Problem Updating",
          description:error.message,
          duration:2000,
          position:"top",
          isClosable:true,

        });
      }
    }
  return (
    <>
   <IconButton onClick={onOpen} variant='ghost' colorScheme='blue' aria-label='See-menu' size={'sm'} icon={<BiEditAlt size={20}/>}/>
   <Modal isOpen={isOpen}
   onClose={onClose}>
   
   <ModalOverlay/>
   <form onSubmit={handleEdit}>
   <ModalContent>
    <ModalHeader>My new Bestie 😍</ModalHeader>
    <ModalCloseButton/>
    <ModalBody pb={6}>
        <Flex alignItems={"center"} gap={4}>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input placeholder="Don Doe" value={inputs.name} onChange={(e)=> setInputs((prev)=>({...prev,name:e.target.value}))}/>
          </FormControl>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Input placeholder='Softwear Enginner' value={inputs.role} onChange={(e)=> setInputs((prev)=>({...prev,role:e.target.value}))}/>
          </FormControl>
        </Flex>
        <FormControl mt={4}>
            <FormLabel>Descrption</FormLabel>
            <Textarea resize={'none'} overflow={'hidden'} placeholder='He is a softwear enginner' value={inputs.description} onChange={(e)=> setInputs((prev)=>({...prev,description:e.target.value}))}/>
          </FormControl>
    
    </ModalBody>
    <ModalFooter>
    <Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>Update</Button>
        <Button onClick={onClose}>Cancel</Button>

    </ModalFooter>
   </ModalContent>
</form>
   </Modal>
   </>
  )
}

export default EditModel
