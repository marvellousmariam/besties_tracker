import { Grid } from '@chakra-ui/react'
import React from 'react'
import { User } from '../chummy'
import UserCard from './UserCard'

const UserGrid = () => {
  return (
    <Grid templateColumns={{base:"1fr",md:"repeat(2, 1fr)",lg:"repeat(3,1fr)"}} gap={4}>
      {
        User.map((user)=>(
            <UserCard key={user.id} user={user}/>
        ))
      }
    </Grid>
  )
}

export default UserGrid
