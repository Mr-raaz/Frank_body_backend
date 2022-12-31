import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {addToCart , quantityZero} from '../../../ReduxStore/Actions/mainAction';
import { useDispatch } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus , faMinus} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
function LtdCard({data}) {

    const cookies = new Cookies();

    let {_id, url_1 , prod_name , best_price , mrp , cartStatus} = data;

    const [curr , setCurr] = useState(cartStatus);
    
    const [quant , setQuant] = useState(1);

    const login_status = useSelector((store) => store.loginStatus);

    const cartData = useSelector((cartdata) => cartdata.cart);

    const dispatch = useDispatch()

    const navigate = useNavigate();

    function detailClick(){
        
        navigate(`/details/${_id}`)

    }

    async function addToCartbtn(){

        if(login_status){
            setCurr(true);
            let token = cookies.get('jwt');
            
            axios.post('http://localhost:5000/products/addtocart' , {
                headers: {
                    Authentication:token
                },
                data:{
                   id:_id 
                }
            }).then((res)=>{
                addToCart(res.data , dispatch);
                
            }).catch((err)=>{
                console.log(err , "from ltd card");
            })

        } else {
            toast.warn('Please Login First', {
                position: "top-center",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        
    }

    function handleIncrementDec(val){

        if(quant + val >= 1){
            setQuant(quant + val)
        }

        if(quant + val == 0){
            setCurr(false);
            let token = cookies.get('jwt');
            
            axios.post('http://localhost:5000/products/deletefromcart' , {
                headers: {
                    Authentication:token
                },
                data:{
                   id:_id 
                }
            }).then((res)=>{
                addToCart(res.data , dispatch);
                // console.log(res.data);
                
            }).catch((err)=>{
                console.log(err , "from ltd card");
            })
            // quantityZero(cartData , dispatch , _id);
        }
        
    }

   
    


    return (
        <>
        <div className='ltdCard_div'>
            <img src={url_1} alt="Not found" className='checkkingsize'  onClick={detailClick}/>
            <div className='prodTitle'  onClick={detailClick}>
            <h6  >{prod_name}...</h6>
            </div>
            <div className='price'  onClick={detailClick}>
                <span>&#x20B9;{best_price}</span>
                <span>&#x20B9;{mrp}</span>
            </div>

            <div>
                    {curr ? <>
                        <div className='quant-div'>
                        <button onClick={()=>handleIncrementDec(-1)}><FontAwesomeIcon icon={faMinus}/></button>
                        <span>{quant}</span>
                            <button onClick={()=>handleIncrementDec(+1)}><FontAwesomeIcon icon={faPlus}/></button>
                            
                            
                        </div>
                    </> : <button className='atcbtn2' onClick={addToCartbtn}>Add To Cart</button> }

                    
            </div>

            {/* <ToastContainer  style={{zIndex:10000000000}}/> */}

        </div>

        <ToastContainer  style={{zIndex:10000000000}}/>

        </>
    );
}

export default LtdCard;