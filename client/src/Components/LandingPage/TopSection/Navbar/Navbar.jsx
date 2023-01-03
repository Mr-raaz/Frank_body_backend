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
    const [value, setValue] = useState("");
    const [data, setdata] = useState([]);

    const getData = async () => {
        let res = await fetch(`https://frank-body-backend.vercel.app/products`)
        let arr = await res.json();
        setdata(arr.data);
    }

    useEffect(() => {
        if (login_status) {
            setCount(cartitem.length);
        }
        getData()
    }, [cartitem, login_status])

    const navigate = useNavigate();
    const searchedValue = (e) => {
        setValue(e.target.value)
    }

    function logoClick() {
        navigate('/');
    }
    const handlestateChange =()=>{
        setChange(false)
        setValue("")
    }
    return (
        <>
            <div className="navbar_outer">
                <div className='logodiv'>
                    <img src={logo} alt="Not found" onClick={logoClick} className="logo"
                    />
                </div>
                <div className='navList' style={change ? {marginLeft:'-300px'} : null}>
                    <ul>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/shop'>Shop</NavLink></li>
                        <li className="res_m"><NavLink to='/about'>About</NavLink></li>
                        <li className="res_m"><NavLink to='/contact'>Contact</NavLink></li>
                    </ul>
                </div>
                <div id='navbarSearchBox'>
                    <span id={change ? 'searchNavicon' : 'searchNaviconChange'}> <FontAwesomeIcon style={change ? { color: '#e76364', marginTop: '8px'} : { color: 'white', marginTop: '8px' , fontSize:'19px' , fontWeight:'bold' , cursor:'pointer'}} icon={faMagnifyingGlass} className="cart_logo" onClick={() => setChange(true)} /></span>
                    <input type="text" value={value} id={change ? 'searchInput' : 'searchInputChange'} onKeyPress={(e) => {
                        if (e.charCode == 13 && value != "") {
                            navigate(`/products?search_query=${value}`)
                            setValue("");
                            setChange(false)
                        }
                    }} onChange={(e) => searchedValue(e)} placeholder='search product' />
                    <FontAwesomeIcon icon={faX} id={change ? 'searchcross' : 'searchcrossChange'} className="cart_logo" onClick={handlestateChange} />
                    <div class='searchdivsuggestion' >
                        {data.filter((elem) => {
                            let title = elem.prod_name.toLowerCase();
                            let key = value.toLowerCase();

                            return key && title.includes(key) && key !== title;
                        })
                            .map((elem, ind) => {
                                return (
                                    <div><p key={ind + 1} onClick={() => setValue(elem.prod_name)} className={change ? "SearchSuggestion test_eclips" : 'SearchSuggestionNew test_eclips'}>{elem.prod_name}</p></div>
                                )
                            }).splice(0, 5)}
                        
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