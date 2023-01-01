import './verification.css'
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    Box,
    Spinner,
    useToast
  } from '@chakra-ui/react';
import { useState ,CSSProperties} from 'react';
import "./Button.css";
import  PropagateLoader from 'react-spinners/PropagateLoader'





  
//   type ForgotPasswordFormInputs = {
//     email: string;
//   };
  
  export const EmailVerification=()=>{
    const [changeName,setChangeName]=useState(false);
    const [changeClass,setChangeClass]=useState("add-btn");
    let btn=document.getElementById("btn");
    const toast=useToast();
    const [obj,setObj]=useState({email:""});
  const [flip,setFlip]=useState(false);
  const [loading, setLoading] = useState(false);
    const handleChange = (e)=>{
        setObj({...obj, [e.target.name]: e.target.value });
    }

    const handleClick= async(e)=>{
        e.preventDefault();
        setLoading(true);
      
      await fetch('https://frank-body-backend.vercel.app/user/sendResetPassword' ,{

                method: "POST",
                headers :{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(obj)
            }).then((response)=>{
                return response.json();        

           }).then((data)=> {
            setLoading(false);
            
                  if(data.status=="success"){
                    setFlip(true);
                    setChangeName(true);
            setChangeClass("active_btn")
                  }
                  else {
                    toast({
                      title: data.message,
                     
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                      position:'top'
                    })
                 
                  }
    })
}

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('rgb(242 141 141)', 'RGB(242 141 141)')}
        >
         {
          flip ?  
          <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={'white'}
          
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
            <img src="https://cdn.dribbble.com/users/4874/screenshots/1776423/inboxiconanimation_30.gif" alt=""  />
            <Box 
              color={'rgb(108,190,62)'}
              textAlign={'center'}
              >
              Reset Password Link sent Successfully
            </Box>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={'gray.400'}>
            You&apos;ll get an email with a reset link
            Password Reset Email sent successfully  Please check your Mail
          </Text>
         
          <Stack spacing={6}>
            
          </Stack>
        </Stack>
                 :
                 <Stack
                 spacing={4}
                 w={'full'}
                 maxW={'md'}
                 bg={('white')}
                 padding={'70px'}
                 rounded={'xl'}
                 boxShadow={'lg'}
                //  p={6}
                 my={12}>

                  <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1438842049/auk7ayohemudyedrknde.png" 
                   style={{width:"100px",height:"100px",margin:"auto"}}
                  alt=""  />
                 <Heading lineHeight={1.1}  fontSize={{ base: '2xl', md: '3xl' }} style={{fontFamily: 'solway',color:'rgb(86,68,71)'}} >
                   Forgot your password?
                 </Heading>
                
                 <FormControl id="email">
              
                   <div class="inputWithIcon">
               <input id='verifiedEmail'   name="email" type="email" placeholder="Enter Your Registered Email" onChange={handleChange}/>
             <i class="fa fa-envelope fa-lg fa-fw" aria-hidden="true"></i>
                  </div>
                 </FormControl>
                 <Stack spacing={6}>
           
                   <div class="hero_btn" style={{marginLeft:'32px'}}>
        <button className={changeClass} onClick={handleClick}>
          
           {
            loading ?  <PropagateLoader
        
        loading='true'
      speedMultiplier={2}
        // emptyColor='gray.200'
        color='white'
        size='16'
       style={{marginTop:'-5px',position:'absolute'}}
      />: <p className="btn_txt">{changeName ? "Thanks" : "Submit"} </p>
           }
          
           <div className="cart-check-box">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 35">
                <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
             </svg>
        </div>
        </button>

    </div>
                 </Stack>
               </Stack>
         } 
       
        
      </Flex>
    );
  }