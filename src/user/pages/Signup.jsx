import React ,{ useEffect, useState }  from 'react'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useRef } from 'react';
import { apiClient } from '../../Services/api-client';
export const Register = () => {
  const [message, setMessage] = useState('');
  const emailRef = useRef();
  const passRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const doRegister=async()=>{
  const userInfo={
      'email':emailRef.current.value,
      'password':passRef.current.value,
      'name':nameRef.current.value,
      'phone':phoneRef.current.value,
    }
    try{
    const response = await apiClient.post('http://localhost:1234/registration',userInfo);
    setMessage(response.data.message);
    console.log('Response is',response);
    console.log('UserINfo',userInfo);
    }catch(err){
      setMessage('Register failed..')
      console.log('Error is',err);
    }
  }
  return (
    <Container>
      <p>{message}</p>
       <TextField inputRef={emailRef}id="outlined-basic" label="Email" variant="outlined" />
       <TextField
       inputRef={passRef}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
       <TextField inputRef={nameRef}id="outlined-basic" label="name" variant="outlined" />
       <TextField inputRef={phoneRef}id="outlined-basic" label="phone" variant="outlined" />
       <Button onClick={doRegister}variant="contained">Register</Button>
    </Container>
  )
}


