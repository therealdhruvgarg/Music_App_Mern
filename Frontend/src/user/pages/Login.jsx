import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { apiClient } from '../../Services/api-client';
import './Login.css'
export const Login = () => {
  const [message,setMessage]=useState('');
  const emailRef = useRef();
  const passRef = useRef();
  const doLogin= async()=>{
    const userInfo={
      'email':emailRef.current.value,
      'password':passRef.current.value,
    }
    try{
    const response = await apiClient.post('http://localhost:1234/login',userInfo)
    setMessage(response.data.message);
    }catch(err){
      setMessage('Login fails.')
      console.log('Error Login',err);
    }

  }
  return (
    <Container>
      <p>{message}</p>
       <TextField inputRef={emailRef} label="Email" variant="outlined" className='login-con' />
       <TextField
       inputRef={passRef}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"className='login-con'
        />
        <Button onClick={doLogin}variant="contained" className='btn-success'>Login</Button>
      </Container>
  )
}

export default Login;
