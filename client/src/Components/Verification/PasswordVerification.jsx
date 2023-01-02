import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Spinner,
  useToast
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom'


export const  PasswordVerification=()=> {
  const navigate =useNavigate();
  const toast =useToast();
// loading
  const [loading, setLoading] = useState(false);

//state manage for  hide or unhide 
  const [hide1,sethide1] = useState(true);
  const [hide2,sethide2] = useState(true);

// useRef use for input and i tag

const inputRef1 = useRef(null);
const inputRef2 = useRef(null);




  const [obj,setObj]=useState({password:"",confirm_password:""});
   const{id,token}=useParams();
    const handleChange = (e)=>{
        setObj({...obj, [e.target.name]: e.target.value });
    }
    const handleClick=async(e)=>{
      e.preventDefault();
      setLoading(true);
     await fetch(`https://frank-body-backend.vercel.app/user/userResetPassword/${id}/${token}` ,{

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
                  navigate('/Login')
                 }else{
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

    const handleHideOne=()=>{
      if(hide1){
        inputRef1.current.type="text";
      }
      else{
        inputRef1.current.type="password";
      }
      sethide1(!hide1);
    }
    const handleHideTwo=()=>{
     
      if(hide2){
        inputRef2.current.type="text";
      }
      else{
        inputRef2.current.type="password";
      }
      sethide2(!hide2);
    }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('rgb(242 141 141)', 'RGB(242 141 141)')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
           <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1438842049/auk7ayohemudyedrknde.png" 
                   style={{width:"100px",height:"100px",margin:"auto"}}
                  alt=""  />
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Reset Password
        </Heading>
        <FormControl id="password" isRequired>
          <FormLabel>Enter Your New password</FormLabel>
          <div class="inputWithIcon" >
          <input id='verifiedEmail'
          ref={inputRef1}
          name='password'
           type="password"
           onChange={handleChange}
          />
            <i class="fa-solid fa-lock" aria-hidden="true" style={{marginTop:'-5px'}}></i>
            <i class={hide1 ?"fa-solid fa-eye-slash" : "fa-solid fa-eye" } style={{marginLeft:'90%',marginTop:'-5px'}} onClick={handleHideOne}></i>
          </div>
        </FormControl>
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Your New password</FormLabel>
          <div class="inputWithIcon" >
               <input id='verifiedEmail' ref={inputRef2}  name="confirm_password" type="password"  onChange={handleChange}/>
             <i class="fa-solid fa-lock" aria-hidden="true" style={{marginTop:'-5px'}}></i>
            <i class={hide2 ?"fa-solid fa-eye-slash" : "fa-solid fa-eye" } style={{marginLeft:'90%',marginTop:'-5px'}} onClick={handleHideTwo}></i>
                  </div>
                 
        </FormControl>
        <Stack spacing={6}>
       <Button
           disabled={loading ? true : false}
           onClick={handleClick}
            bg={'rgb(242,141,141)'}
            color={'white'}
            _hover={{
              bg: 'rgb(250,193,186)',
              color:'rgb(63,42,45)'
            }}
            
          >
            {loading ?  <Spinner
        
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='rgb(231 99 100)'
        
        size='md'
      />:"Submit"}
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}