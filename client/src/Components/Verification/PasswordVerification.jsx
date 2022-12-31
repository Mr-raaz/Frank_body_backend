import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import {useParams } from 'react-router-dom'
export const  PasswordVerification=()=> {

  // password, confirm_password
  const [obj,setObj]=useState({password:"",confirm_password:""});
   const{id,token}=useParams();
    const handleChange = (e)=>{
        setObj({...obj, [e.target.name]: e.target.value });
    }
    const handleClick=async(e)=>{
      e.preventDefault();
      console.log(obj);
     await fetch(`http://localhost:5000/user/userResetPassword/${id}/${token}` ,{

               method: "POST",
               headers :{
                   "Content-Type" : "application/json"
               },
               body : JSON.stringify(obj)
           }).then((response)=>{
               return response.json();        

          }).then((data)=> {
                 console.log(data);
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
          onClick={handleClick}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
              
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}