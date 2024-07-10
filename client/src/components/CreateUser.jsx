import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from '@chakra-ui/react'
import {BiAddToQueue} from "react-icons/bi"
import React from 'react'

const CreateUser = () => {
    const {isOpen,onOpen,onClose}=useDisclosure()
  return (
    <>
   <Button onClick={onOpen}><BiAddToQueue size={20}/></Button>
   <Modal isOpen={isOpen}
   onClose={onClose}>
   
   <ModalOverlay/>
   <ModalContent>
    <ModalHeader>My new Bestie 😍</ModalHeader>
    <ModalCloseButton/>
    <ModalBody pb={6}>
        <Flex alignItems={"center"} gap={4}>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input placeholder='Don Doe'/>
          </FormControl>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Input placeholder='Softwear Enginner'/>
          </FormControl>
        </Flex>
        <FormControl mt={4}>
            <FormLabel>Descrption</FormLabel>
            <Textarea resize={'none'} overflow={'hidden'} placeholder='He is a softwear enginner'/>
          </FormControl>
          <RadioGroup defaultValue='male' mt={4}>
            <Flex gap={5}>
               <Radio value='male'>Male</Radio>
               <Radio value='female'>Female</Radio>
            </Flex>
          </RadioGroup>
    </ModalBody>
    <ModalFooter>
    <Button colorScheme='blue' mr={3}>Add</Button>
        <Button onClick={onClose}>Cancel</Button>

    </ModalFooter>
   </ModalContent>

   </Modal>
   </>
  )
}

export default CreateUser
