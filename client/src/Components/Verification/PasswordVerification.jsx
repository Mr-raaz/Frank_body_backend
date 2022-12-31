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
import { useState } from 'react';
import {useNavigate, useParams } from 'react-router-dom'


export const  PasswordVerification=()=> {
  const navigate =useNavigate();
  const toast =useToast()
  const [loading, setLoading] = useState(false);
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
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Enter new password
        </Heading>
        <FormControl id="password" isRequired>
          <FormLabel>Enter Your New password</FormLabel>
          <Input
          name='password'
           type="password"
           onChange={handleChange}
          />
        </FormControl>
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Your New password</FormLabel>
          <Input type="password" name='confirm_password' onChange={handleChange} />
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