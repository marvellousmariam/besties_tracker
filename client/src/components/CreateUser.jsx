import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure, useToast } from '@chakra-ui/react'
import {BiAddToQueue} from "react-icons/bi"
import React, { useState } from 'react'
import { BASE_URL } from '../App'

const CreateUser = ({setUsers}) => {
    const {isOpen,onOpen,onClose}=useDisclosure()
    const [isLoading,setIsLoading]=useState(false)
    const [input,setInput]=useState({
      name:"",role:"",description:"",gender:""
    })
    const toast = useToast()
    const handleSubmit=async(e)=>{
      e.preventDefalut();
      setIsLoading(true);
      try{
        const res=await fetch(BASE_URL+"createbesties",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",

          },
          body:JSON.stringify(input),
        })
        const data = await res.json();
        if(!res.ok){
          throw new Error(data.error)
        }
        toast({
          status:"success",
          title:"New Bestie Acquired",
          description:"Wishing you happy frienship",
          duration:2000,
          position:"top",
          isClosable:true,

        });
        setUsers((prevUsers)=>[...prevUsers,data])
        onClose();
        
      }catch(error){
        toast({
          status:"error",
          title:"Problem Friend",
          description:error.message,
          position:"bottom",
          isClosable:true,
          duration:4000,
        });

      }finally{
        setIsLoading(false);
        setInput({  name:"",role:"",description:"",gender:""});
      }
    }
    
  return (
    <>
   <Button onClick={onOpen}><BiAddToQueue size={20}/></Button>
   <Modal isOpen={isOpen}
   onClose={onClose}>
   
   <ModalOverlay/>
   <form onSubmit={handleSubmit}>
   <ModalContent>
    <ModalHeader>My new Bestie 😍</ModalHeader>
    <ModalCloseButton/>
    <ModalBody pb={6}>
        <Flex alignItems={"center"} gap={4}>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input placeholder='Don Doe' value={input.name} onChange={(e)=>setInput({...input,name:e.target.value})}/>
          </FormControl>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Input placeholder='Softwear Enginner' value={input.role} onChange={(e)=>setInput({...input,role:e.target.value})}/>
          </FormControl>
        </Flex>
        <FormControl mt={4}>
            <FormLabel>Descrption</FormLabel>
            <Textarea resize={'none'} overflow={'hidden'} placeholder='He is a softwear enginner' 
            value={input.description} onChange={(e)=>setInput({...input,description:e.target.value})}/>
          </FormControl>
          <RadioGroup defaultValue='male' mt={4}>
            <Flex gap={5}>
               <Radio value='male'  onChange={(e)=>setInput({...input,gender:e.target.value})}>Male</Radio>
               <Radio value='female' onChange={(e)=>setInput({...input,gender:e.target.value})}>Female</Radio>
            </Flex>
          </RadioGroup>
    </ModalBody>
    <ModalFooter>
    <Button colorScheme='blue' mr={3}  type='submit'
    isLoading={isLoading}>Add</Button>
        <Button onClick={onClose}>Cancel</Button>

    </ModalFooter>
   </ModalContent>
</form>
   </Modal>
   </>
  )
}

export default CreateUser
