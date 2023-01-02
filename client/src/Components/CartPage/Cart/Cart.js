import React, { useRef } from 'react';
import Navbar from '../../LandingPage/TopSection/Navbar/Navbar';
import './Cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleRight , faTrash} from '@fortawesome/free-solid-svg-icons';
import offerPng from './offer.png';
// import party from "party-js";
import { useSelector } from 'react-redux';
import Product from './Product';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Cart() {

    const coupon_input = useRef();
    const cartData = useSelector((store) => store.cart);

    const [total_price , setTotalPrice] = useState(0);
    const [price_discount , setPriceDiscount] = useState(0);
    const [coupon_status , setcouponStatus] = useState(false);
    const [invalid_coupon , setValidCoupon] = useState(false);
    const navigate = useNavigate();
    
    const[count_price , setPrice] = useState(0);

    function check(val){
        setTotalPrice((prev) => prev+val);
        
        if(val < 0){
            setPriceDiscount((prev) => prev - 47)
        } else {
            setPriceDiscount((prev) => prev + 47)
        }
    }

    function cartPrice(){
       let temp = 0;

       cartData.map((elem)=>{
        if(elem){
            temp += (elem.best_price * elem.quantity);
        }
       })
        setTotalPrice(temp);

        setPriceDiscount(Math.floor(temp/10 - Math.random() * 60))
    }

    function handleProceed(){
        navigate('/checkout')
    }


    function handlecoupon(e){
        let text = coupon_input.current.value;

        if(text == "FIRST"){
            setTotalPrice((prev) => Math.floor(prev/2))
            setcouponStatus(true)
            setValidCoupon(false);
        } else {
            setValidCoupon(true);
        }
    }

    function handleremove(){
        setTotalPrice((prev) => prev+prev)
            setcouponStatus(false)
    }
    useEffect(()=>{
        cartPrice();
    },[cartData])

    return ( 
         <>
            <Navbar />
            
            <div className="cart_outer_content">
            <p className='location'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Home <FontAwesomeIcon icon = {faAngleRight} /></b>&nbsp;  Cart</p>

            <div className="new_cart_outer">
                    <div className='left_div'>
                        <div className='first_section'>
                            <p>
                            
                                <span>Continue Shopping</span><span> <b>{cartData.length}</b> Items</span>
                            </p>
                        </div>

                        <div className="cart_items_section">

                            
                            
                        {cartData.length > 0 && cartData.map((elem , idx)=>{
                            
                            if(elem){
                                return <Product elem={elem} func={check}/>
                            }
                             
                         })}
                                
                        </div>
                    </div>

                    <div className='right_div'>
                            <div className="top_offer">
                                <div><img src={offerPng} alt="Not found" /></div>



                                <div><p className='offer_line'>Use Code <span className='new_user_name'>FIRST</span>  And Get 50% Discount</p></div>

                                
                            </div>

                            <div className="price_detail_section">
                                    
                                <p><span>Item Total (MRP) </span> <span>&#x20B9; {total_price}</span></p>
                                <p><span>Price Discount </span> <span>- &#x20B9; {price_discount}</span></p>

                                <hr  className='first_hr'/>

                                <p><span>Shipping Fee </span> <span>&#x20B9; 99</span></p>
                                <p><span>Packaging Charges </span> <span> &#x20B9; 45</span></p>

                                <hr  className='first_hr'/>

                                <p className='final_amount'><span>To Be Paid </span> <span> &#x20B9; {Math.floor(total_price-price_discount + 144)}</span></p>
                            </div>


                            <div className='coupon_section'>
                                    <div>Discount Coupon</div>
                                    {
                                        coupon_status ? <>
                                            <div className="coupon_box">
                                                <div>
                                                    Coupon Applied : <span className='remove' onClick={handleremove}>Remove</span>
                                                </div>

                                                <div>-&#x20B9; {total_price}</div>
                                            </div>
                                        </> : <><div className='coupon_input_box'>
                                        <input type="text"  ref={coupon_input}/>
                                        <button onClick={handlecoupon}>Apply</button>
                                    </div>
                                    {
                                        invalid_coupon ? <p className='invalid_coupon'>Invalid Coupon Code</p> : null
                                    }
</> 
                                    
                                    }
                            </div>


                            <div className="proceed_btn">
                                <button onClick={handleProceed}>PROCEED</button>
                            </div>
                            
                        
                    </div> 
                       
            </div> 
            


            </div>

        </>
    );
}

export default Cart;