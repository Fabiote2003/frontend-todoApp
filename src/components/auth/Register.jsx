import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import classes from './AuthForm.module.scss';

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const register = async (e) => {
        e.preventDefault();
        const user = {
            name,
            email,
            password
        }

        try {
            await axios.post('/api/auth/register', user);
            toast.success('Register Successful');
            setEmail('');
            setName('');
            setPassword('');
        } catch (error) {
            console.log(error);
            toast.error('Register Failed');
        }

    }


  return (
    <div className={classes.register}>
        <h1 className={classes.title}>Register</h1>
        <form className={classes.authForm} onSubmit={register}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder='Full name' value={name} onChange={(e) => setName(e.target.value)} required/>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Register