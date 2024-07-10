import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Textarea, useDisclosure } from '@chakra-ui/react'
import {BiAddToQueue, BiEditAlt} from "react-icons/bi"
import React from 'react'

const EditModel = ({user}) => {
    const {isOpen,onOpen,onClose}=useDisclosure()
  return (
    <>
   <IconButton onClick={onOpen} variant='ghost' colorScheme='blue' aria-label='See-menu' size={'sm'} icon={<BiEditAlt size={20}/>}/>
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
            <Input placeholder="Don Doe"/>
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

export default EditModel
