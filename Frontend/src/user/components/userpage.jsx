import React from 'react'
import { Register } from '../pages/Signup'
import { Typography } from '@mui/material'
import Login from '../pages/Login'

export const userPage = () => {
  return (
   <>
   <Typography>Login</Typography><Login/>
   <Typography>Register</Typography><Register/></>
  )
}

