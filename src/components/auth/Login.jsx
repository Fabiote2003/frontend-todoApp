import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.scss';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const Login =  () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
   const login = async (e) => {
    e.preventDefault();
    const user = {
        email,
        password
    }

    try {
        const res = await axios.post('/api/auth/login', user);
        console.log(res);
        navigate('/');
        toast.success(res.data.msg);
    } catch (error) {
        console.log(error);
        toast.error('¡Login Failed!')
    }
   }

  return (
    <div className={classes.register}>
        <h1 className={classes.title}>Login</h1>
        <form className={classes.authForm} onSubmit={login}>
            <label htmlFor='email'>Email</label>
            <input type="email" name="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}  required/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login