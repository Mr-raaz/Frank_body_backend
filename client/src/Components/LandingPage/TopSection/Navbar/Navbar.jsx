import React, { useEffect, useState } from 'react';
import './navbar.css'
import logo from '../img/log.png'
import { NavLink } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass , faUser , faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Navbar() {

    const cartitem = useSelector((store) => store.cart);

    const [count , setCount] = useState(cartitem.length);

    useEffect(()=>{
        setCount(cartitem.length);
    },[cartitem])

    const navigate = useNavigate();

    function logoClick(){
        navigate('/');
    }
    return (
        <>
                <div className="navbar_outer">
                    <div className='logodiv'>
                        <img src={logo} alt="Not found" onClick={logoClick}  className="logo"
                        />
                    </div>
                    <div className='navList'>
                            <ul>
                                <li><NavLink to='/'>Home</NavLink></li>
                                <li><NavLink to='/shop'>Shop</NavLink></li>
                                <li className="res_m"><NavLink to='/about'>About</NavLink></li>
                                <li className="res_m"><NavLink to='/contact'>Contact</NavLink></li>
                            </ul>
                    </div>
                    <div className='navbar_icons'>
                    <NavLink className="res_m"><FontAwesomeIcon icon={faMagnifyingGlass} className="cart_logo"/></NavLink>
                    <NavLink to='/profile'><FontAwesomeIcon icon={faUser} className="cart_logo"/></NavLink>
                    <NavLink to='/cart' className="res_m"><div className='cartLogo_div'>
                    <FontAwesomeIcon icon={faCartShopping} className="cart_logo"/>
                    {
                        count == 0 ? null :<p className='cartQuant'>{count}</p>
                    }
                    </div></NavLink>

                    </div>
                </div>
        </>
    );
}

export default Navbar;