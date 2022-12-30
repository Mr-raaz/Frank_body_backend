import React, { useEffect } from 'react';
import Navbar from '../LandingPage/TopSection/Navbar/Navbar';
import './Profile.css'
import avtar from './img/avtar.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTruck , faAngleRight} from '@fortawesome/free-solid-svg-icons';
import edit from './img/edit.png';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import {SetLogin} from '../../ReduxStore/Actions/mainAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Profile() {

    const cookies = new Cookies();

    const dispatch = useDispatch();
   
  
    function handleLogout(){
        SetLogin(dispatch , false);
        cookies.remove('jwt')
    }
    return (
        <>
            <Navbar />

            <h3>New profile page here.....</h3>

            <button style={{marginTop:'100px'}} onClick={handleLogout}>logout</button>
        </>
    );
}

export default Profile;