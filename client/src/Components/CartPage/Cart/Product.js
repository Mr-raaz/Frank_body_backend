import React from 'react';
import { addToCart } from '../../../ReduxStore/Actions/mainAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
function Product({elem , func}) {
    
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const [quantity , setQuant] = useState(elem.quantity);

    function handleQuantity(val){
        if(quantity + val >= 1){
            setQuant(quantity + val)

            if(val < 0) {
                func(-elem.best_price);
            } else {
                func(elem.best_price);
            }
        }
    }

    function handleClick(){
        let token = cookies.get('jwt');
            
        axios.post('https://frank-body-backend.vercel.app/products/deletefromcart' , {
            headers: {
                Authentication:token
            },
            data:{
               id:elem._id 
            }
        }).then((res)=>{
            addToCart(res.data , dispatch);            
        }).catch((err)=>{
            console.log(err , "from ltd card");
        })
    }


    return (
        
        <div className="detail_product" key={elem._id}>
                            <div>
                                <img src={elem.url_1} alt="not found" />
                            </div>

                            <div className='product_right_div'>


                                    <div className='product_title'>
                                        <p className='title_pro'>{elem.prod_name}</p>
                                        <p>In Stock</p>
                                        <p>price : &#x20B9; {elem.best_price}</p>
                                    </div>


                                    <div  className='quant_div'>
                                        
                                    <button onClick={()=> handleQuantity(-1)}> -</button>
                                        <p>{quantity}</p>
                                        
                                        <button onClick={()=> handleQuantity(1)}>+</button>
                                    </div>

                                    <div className='delete_btn'>
                                                    <FontAwesomeIcon icon={faTrash} className="del_btn" onClick={handleClick}/>
                                    </div>
                            </div>
                            </div>

                            
    );
}

export default Product;