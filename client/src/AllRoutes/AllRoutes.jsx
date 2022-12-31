import React from 'react';
import { useEffect,useState } from 'react';
import {Routes , Route , Navigate} from 'react-router-dom';
import LandingPage from '../Components/LandingPage/LandingPage';
import ProductPage from '../Components/ProductPage/ProductPage';
import About from '../Components/About/About';
import Contact from '../Components/Contact/Contact';
import ProductDescription from '../Components/ProductDescription/ProductDescription';
import Login from '../Components/Login_Signup/Login';
import Profile from '../Components/Profile/Profile';
import Register from '../Components/Login_Signup/Register';
import { useSelector } from 'react-redux';
import ProductCategory from '../Components/ProductCategory/ProductCategory'
import Payment from '../Components/PaymentPage/Payment';
import Payment2 from '../Components/PaymentPage/Payment2';
import PaymentDialouge from '../Components/PaymentPage/PaymentDialouge';
import EmptyCart from '../Components/CartPage/EmptyCart/EmptyCart';
import Cart from '../Components/CartPage/Cart/Cart';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {SetLogin} from '../ReduxStore/Actions/mainAction';
import { useDispatch } from 'react-redux';
import { EmailVerification } from '../Components/Verification/EmailVerification';
import { ChakraProvider } from '@chakra-ui/react'
function AllRoutes() {

    const isLogin = useSelector((store) => store.loginStatus);
    const cartLen = useSelector((store) => store.cart.length);
    const cookies = new Cookies();
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);


    // console.log(cartLen);

    // console.log(user);


    useEffect(() => {
        const getUser = () => {
          fetch("http://localhost:5000/auth/login/success", {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          })
            .then((response) => {
              if (response.status === 200) return response.json();
              console.log("authentication has been failed!")
              throw new Error("authentication has been failed!");
              
            })
            .then((resObject) => {
              setUser(resObject.user);

              addTobackend(resObject.user);
              

            })
            .catch((err) => {
              console.log(err);
            });
        };
        getUser();
      }, []);


      async function addTobackend(data){

        axios.post('http://localhost:5000/user/googleregister' , {
          name:data.displayName,
          email:data.emails[0].value,
          avtar:data.photos[0].value
        }).then((res)=>{
          cookies.set('jwt' , res.data.token , {
            maxAge:24 * 60 * 60 * 100
          });
          SetLogin(dispatch , true);
        }).catch((err)=>{
              console.log(err);
        })
      } 

    return (
        <>


                    <Routes>
                        <Route path='/' element={<LandingPage />} />
                        <Route path='/shop' element={<ProductPage />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path ='/Login' element={<Login />} />
                        <Route path='/details/:id' element={<ProductDescription />} />
                        <Route path='/profile' element={isLogin ? <Profile  /> : <Navigate to='/Login' />} />
                        <Route path = '/register' element={<Register />} />
                        <Route path='/category/:type' element={<ProductCategory />} />
                        <Route path='/checkout' element={<Payment />} />
                        <Route path='/payment' element={<Payment2 />} />
                        <Route path = '/paymentDone' element={<PaymentDialouge />} />
                        <Route path='/cart' element={isLogin ? (cartLen==0 ? <EmptyCart /> : <Cart />) : <Navigate to='/Login' />} />
                       <Route  path='/email-verification' element={<ChakraProvider> <EmailVerification/> </ChakraProvider>}/>
                    </Routes>  
        </>
    );
}

export default AllRoutes;