import React from 'react'
import classes from './Navbar.module.scss';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Navbar = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const data = await axios('/api/user/me');
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.get('/api/auth/logout');
            setUser(null);
            toast.success('User Logout');
            navigate('/auth');
        } catch (error) {
            console.log(error);
        }
    }

    if(!user) return (
        <div className={classes.spinner}>
            <div className={classes.rect1}></div>
            <div className={classes.rect2}></div>
            <div className={classes.rect3}></div>
            <div className={classes.rect4}></div>
            <div className={classes.rect5}></div>
        </div>
    );



  return (
    <header>
        <div className={classes.userInfo}>
            <FaUserAlt className={classes.userIcon}></FaUserAlt>
            <div>
                <h1 className={classes.name}>{user.data.name}</h1>
                <h1 className={classes.email}>{user.data.email}</h1>
                <Link to='/edit-profile' className={classes.editBtn}>Edit</Link>
            </div>
        </div>
        <nav>
            <button type='button' className={classes.logout} onClick={handleLogout}>Logout</button>
        </nav>
    </header>
  )
}

export default Navbar