
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import { useState } from 'react';

  
//   type ForgotPasswordFormInputs = {
//     email: string;
//   };
  
  export const EmailVerification=()=>{
 
    
    const [obj,setObj]=useState({email:""});

    const handleChange = (e)=>{
        setObj({...obj, [e.target.name]: e.target.value });
    }

    const handleClick= async(e)=>{
        e.preventDefault();
       console.log(obj);
      await fetch('http://localhost:5000/user/sendResetPassword' ,{

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
            Forgot your password?
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input onChange={handleChange}
            name="email"
              placeholder="Enter Your Registered Email"
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button onClick={handleClick}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Request Reset Password
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }