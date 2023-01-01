
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
import { useState } from 'react';
import { use } from 'react-toastify';




  
//   type ForgotPasswordFormInputs = {
//     email: string;
//   };
  
  export const EmailVerification=()=>{
 
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
       
          // bgImage="url(https://image.shutterstock.com/image-photo/golden-sparkles-on-pink-pastel-260nw-1182869260.jpg)"
          // opacity={0.9}
    
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
                 bg={('rgb(247,232,233)')}
                 
                 rounded={'xl'}
                 boxShadow={'lg'}
                 p={6}
                 my={12}>
                 <Heading lineHeight={1.1}  fontSize={{ base: '2xl', md: '3xl' }} style={{fontFamily: 'solway',color:'rgb(86,68,71)'}} >
                   Forgot your password?
                 </Heading>
                 <Text
                   fontSize={{ base: 'sm', sm: 'md' }}
                   color={('gray.800', 'gray.400')}>
                   Forgot your password ? No Problem, Just let us now your email address and we will email you a password reset link that will allow
                   you to choose a new one.
                 </Text>
                 <FormControl id="email">
                   <Input onChange={handleChange}
                   name="email"
                     placeholder="Enter Your Registered Email"
                     _placeholder={{ color: 'gray.500' }}
                     bg="white"
                     type="email"
                   />
                 </FormControl>
                 <Stack spacing={6}>
                   <Button onClick={handleClick}
                     bg={'rgb(63,42,45)'}
                     color={'white'}
                     disabled={loading ? true : false}
                     _hover={{
                       bg: 'rgb(250,193,186)',
                       color:'rgb(63,42,45)'
                     }}>
                     {loading ?  <Spinner
        
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='rgb(231 99 100)'
        size='md'
      />:'Request Reset Password'} 
                   </Button>
                 </Stack>
               </Stack>
         } 
       
        
      </Flex>
    );
  }