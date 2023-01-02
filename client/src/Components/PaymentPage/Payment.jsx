import React, {useState} from 'react';
import './Payment.css';
import Navbar from '../LandingPage/TopSection/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons'
import {TextField} from '@mui/material'
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
function Payment() {

    const [address , setAddress] = useState({
      fname:"",
      lname:"",
      email:"",
      contact:"",
      pincode:"",
      landmark:"",
      detail:""
    })

    const navigate = useNavigate();
    const cookies = new Cookies();

    function handleChange(e){

      const {name , value} = e.target;

      setAddress({...address , [name] : value});

    }


  function handleContinue(e){  
    
      e.preventDefault();

      let token = cookies.get('jwt');
      axios.post('https://frank-body-backend.vercel.app/user/setAddress' , {

      token:token,
      address:address

      }).then((res)=>{
        // alert('done');
        navigate('/payment');
      })
      

      console.log(address);
  }
    return (
        <>
        <Navbar />
            <div className="payment_outer">
                    <div>
                        <div className='check'><FontAwesomeIcon className='tick' icon={faCheck}/></div>
                        <div>My Cart</div>
                    </div>
                    <div className='other_mark curr'>
                        <div className='check'>2</div>
                        <div>Address</div>
                    </div>

                    <div className='other_mark hei'>
                        <div className='check'>3</div>
                        <div> &nbsp;&nbsp;&nbsp;Payment</div>
                    </div>
            </div>

            <div className="address_form">

                    <h4>Add a new Address</h4>
                <form className='addressForm' onSubmit={(e)=> e.preventDefault()}>

                    
                    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch'},
      }}
      Validate
      autoComplete="off"
    >
      <div>
        <TextField
          label="First Name"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          name='fname'
          value={address.fname}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          name='lname'
          value={address.lname}
          onChange={handleChange}
        />
      </div>
      <div className='divTest'>
      <TextField
          label="Email"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          sx={{
        width: 300
    }}
    InputProps={{ sx: { height: 40 , width: 500 } }}
    placeholder=""
    name='email'
          value={address.email}
          onChange={handleChange}
        /></div>
        <div className='divTest'>
      <TextField
          label="Contact Number"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          sx={{
        width: 300
    }}
    InputProps={{ sx: { height: 40 , width: 500 } }}
    placeholder=""
    name='contact'
          value={address.contact}
          onChange={handleChange}
        /></div><div className='divTest'>
      <TextField
          label="Pin Code"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          sx={{
        width: 300
    }}
    InputProps={{ sx: { height: 40 , width: 500 } }}
    placeholder=""
    name='pincode'
          value={address.pincode}
          onChange={handleChange}
        /></div><div className='divTest'>
      <TextField
          label="Landmark"
          id="outlined-size-small"
          defaultValue=""
          size="small"
          sx={{
        width: 300
    }}
    InputProps={{ sx: { height: 40 , width: 500 } }}
    placeholder=""
    name='landmark'
          value={address.landmark}
          onChange={handleChange}
        /></div>
        
        <input type="text" placeholder='Flat Number , Building Name , Street Locality' className='addressinput'

name='detail'
          value={address.detail}
          onChange={handleChange}
        />

        
      
      
    </Box>
                <div className="payment_btn_div">
                <button onClick={handleContinue}>Continue</button>
                </div>
                </form>
            </div>
        </>
    );
}

export default Payment;