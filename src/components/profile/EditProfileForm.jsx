import React from 'react';
import {Link} from 'react-router-dom';
import classes from './EditProfileForm.module.scss';
import {BsArrowLeftShort} from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const EditProfileForm = () => {
    const [user, setUser] = useState({
        name: '',
        email: ''
    })
    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('/api/user/me');
                    setUser(data);
                } catch (error) {
                    console.log(error)
                }
            }
        )()
    }, []);

    const updateUserInfo = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const updateProfile = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put('/api/user/me', user)
            toast.success('¡Profile Updated!')
            setUser(res.data);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <Link to='/' className={classes.backBtn}>
            <BsArrowLeftShort></BsArrowLeftShort>
            Home
        </Link>
        <div>
            <h1>Edit Profile</h1>
            <form className={classes.editForm} onSubmit={updateProfile} >
                <label htmlFor="name">Name</label>
                <input type="text" name='name' placeholder='Full Name' required defaultValue={user.name} onChange={updateUserInfo}/>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='Email' required defaultValue={user.email} onChange={updateUserInfo}/>
                <button type='submit'>Save</button>
            </form>
        </div>
    </div>
  )
}

export default EditProfileForm