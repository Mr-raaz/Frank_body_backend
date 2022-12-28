import React  , {useState}from 'react';
import Navbar from '../LandingPage/TopSection/Navbar/Navbar';
import { Link  , Navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import {faGoogle , faFacebook} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import {toast as tt} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRef } from 'react';
function Register() {

    const email = useRef();
    const pass = useRef();
    const fname = useRef();
    const lname = useRef();


    function handleFormSubmit(e){

        e.preventDefault();

        axios.post('https://frank-body-backend.vercel.app/user/register' , {
            name:fname.current.value +" "+lname.current.value,
            email:email.current.value,
            password:pass.current.value
        }).then((res)=>{
          toast.success(`${res.data}`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }).catch((err)=>{
          toast.error(`${err.response.data}`, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        })

    }







    return (
        <>
            <Navbar />

            <div className="login_div">
                <div className="inner_login_div">
                    <div>
                        <img src="https://colorlib.com/etc/regform/colorlib-regform-20/images/registration-form-4.jpg" alt="Not Found" />
                    </div>


                    <div className='formSide'>

                    <div  className='registerconatiner'>

        <form className='registerform' onSubmit={handleFormSubmit}>
            <h2 className='cana'>Create an account</h2>
            <input name="email" type="email" placeholder="Email" required ref={email}/>
            <input name="password" type="password" placeholder="Password" required ref={pass}/>
            <input name="fname" type="text" placeholder="First name"  required ref={fname}/>
            <input name="lname" type="text" placeholder="Last name"  required ref={lname}/>

            <ToastContainer  style={{zIndex:100000}}/>
            <span className='maysend'>You'll be sent an email with instructions to activate your account</span>
            <input  type="submit" value="REGISTER"/>
        </form>
        <div className='registerlinks'>
            <Link className='registerlinksdata firstlink' to="/login">Have an account? Login</Link>
        </div>
    </div>
                    
    <ToastContainer  style={{zIndex:100000000}}/>
    

    
                    </div>


                </div>
            </div>
        </>
    );
}

export default Register;