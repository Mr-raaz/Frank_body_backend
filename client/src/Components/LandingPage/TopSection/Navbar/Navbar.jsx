import React, { useEffect, useState } from 'react';
import './navbar.css'
import logo from '../img/log.png'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faCartShopping, faX } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {

    const cartitem = useSelector((store) => store.cart);
    const login_status = useSelector((store) => store.loginStatus);
    const [change, setChange] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (login_status) {
            setCount(cartitem.length);
        }
    }, [cartitem, login_status])

    const navigate = useNavigate();

    function logoClick() {
        navigate('/');
    }
    return (
        <>
            <div className="navbar_outer">
                <div className='logodiv'>
                    <img src={logo} alt="Not found" onClick={logoClick} className="logo"
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
                <div id='navbarSearchBox'>
                    <span id={change ? 'searchNavicon' : 'searchNaviconChange'}> <FontAwesomeIcon style={change ? { color: '#e76364', marginTop: '8px' } : { color: 'white', marginTop: '8px' }} icon={faMagnifyingGlass} className="cart_logo" onClick={() => setChange(true)} /></span>
                    <input type="text" id={change ? 'searchInput' : 'searchInputChange'} />
                    <FontAwesomeIcon icon={faX} id={change ? 'searchcross' : 'searchcrossChange'} className="cart_logo" onClick={() => setChange(false)} />
                    <div class='searchdivsuggestion' >
                        <div className={change ? "SearchSuggestion" : 'SearchSuggestionNew'}></div>
                        <div className={change ? "SearchSuggestion" : 'SearchSuggestionNew'}></div>
                        <div className={change ? "SearchSuggestion" : 'SearchSuggestionNew'}></div>
                        <div className={change ? "SearchSuggestion" : 'SearchSuggestionNew'}></div>
                        {/*  */}
                    </div>
                </div>

                <div className='navbar_icons'>
                    <NavLink to='/profile'><FontAwesomeIcon icon={faUser} className="cart_logo" /></NavLink>
                    <NavLink to='/cart' className="res_m"><div className='cartLogo_div'>
                        <FontAwesomeIcon icon={faCartShopping} className="cart_logo" />
                        {
                            count == 0 ? null : <p className='cartQuant'>{count}</p>
                        }
                    </div></NavLink>

                </div>
            </div>
        </>
    );
}

export default Navbar;