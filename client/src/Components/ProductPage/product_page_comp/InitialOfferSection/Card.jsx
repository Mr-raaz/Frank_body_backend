import React, { useEffect, useState } from 'react';
import {motion as m } from 'framer-motion';
import { useAsyncError, useNavigate } from 'react-router-dom';
import {addToCart , quantityZero} from '../../../../ReduxStore/Actions/mainAction';
import { useDispatch } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus , faMinus} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function Card({data}) {
    const cookies = new Cookies();
    let {url_1 , prod_name , best_price  , _id , cartStatus} = data;

    const cartData = useSelector((cartdata) => cartdata.cart);

    const [cartState , currCartState] = useState(cartStatus);
    
    const [quant , setQuant] = useState(1);
    const login_status = useSelector((store) => store.loginStatus);

    const dispatc = useDispatch();

    const navigate = useNavigate();


    function handleProductClick(){
        navigate(`/details/${_id}`);
    }

    function clickcheck(){
        addToCart(data , dispatc , _id);
        navigate('/cart');
    }

    function addtoc(){


        if(login_status){
            currCartState(true);
            let token = cookies.get('jwt');
            
            axios.post('https://frank-body-backend.vercel.app/products/addtocart' , {
                headers: {
                    Authentication:token
                },
                data:{
                   id:_id 
                }
            }).then((res)=>{
                addToCart(res.data , dispatc);
                
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
        // currCartState(true);

        // addToCart(data , dispatc , _id);

    }

    function handleIncrementDec(val){

        if(quant + val >= 1){
            setQuant(quant + val)
        }

        if(quant + val == 0){
            currCartState(false);

            let token = cookies.get('jwt');
            
            axios.post('https://frank-body-backend.vercel.app/products/deletefromcart' , {
                headers: {
                    Authentication:token
                },
                data:{
                   id:_id 
                }
            }).then((res)=>{
                addToCart(res.data , dispatc);
                
            }).catch((err)=>{
                console.log(err , "from ltd card");
            })
        }
        
    }


    return (
        <>
            <m.div className='card'
            animate={{opacity:1}}
            initial={{opacity:0}}
            transition={{
    opacity: { ease: "easeOut" },
    layout: { duration: 0.3 }
  }}
            exit={{opacity:0}}
          >
                                <img src={url_1} alt="Not Found"  onClick={handleProductClick}/>

                                <div className='card_details' onClick={handleProductClick}>

                                    <div>
                                        <p className='prodNameElii'>{prod_name}</p>
                                    </div>


                                    <div> <span>⭐⭐⭐⭐⭐</span> <b>&#x20B9; {best_price}</b></div>


                                </div>

                                <div className='card_buttons'>
                                    {
                                        cartState ? <span className='product_page_counter'>
                                        <button onClick={()=>handleIncrementDec(-1)}><FontAwesomeIcon icon={faMinus}/></button>
                        <span>{quant}</span>
                            <button onClick={()=>handleIncrementDec(+1)}><FontAwesomeIcon icon={faPlus}/></button>
                                        </span> :<span><button className='atc' onClick={addtoc}>Add To Cart</button></span>

                                    }
                                    <span><button className='bn' onClick={clickcheck}> Buy Now</button></span>
                                </div>


                        </m.div>
        </>
    );
}

export default Card;