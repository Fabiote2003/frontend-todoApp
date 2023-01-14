import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Layout from '../components/Layout'
import useAuth from '../hooks/useAuth';
import classes from './Auth.module.scss';

const Auth = () => {

  const {auth} = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if(auth === true) {
      navigate('/');
    }
  }, [auth, navigate])

  return (
    <Layout>
      <div className={classes.form_container} >
        <Login />
        <Register />
      </div>
    </Layout>
  )
}

export default Auth