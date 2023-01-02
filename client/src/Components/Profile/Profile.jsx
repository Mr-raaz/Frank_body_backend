import React from 'react';
// import {Box} from "@mui/material"

import { useState } from 'react';
import Navbar from '../LandingPage/TopSection/Navbar/Navbar';
import { Box } from '@chakra-ui/react'
import { Text, Button, useMediaQuery, HStack, VStack, Grid, GridItem, Image, Heading, FormControl, FormHelperText,
    FormLabel, Input
} from '@chakra-ui/react';
import {profileSideList} from "../../constant"
import Cookies from 'universal-cookie';
import {SetLogin} from '../../ReduxStore/Actions/mainAction';
import { useDispatch } from 'react-redux';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import { Select } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { EditIcon} from '@chakra-ui/icons'

function Profile(props) {
  
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const [isLargerThan500] = useMediaQuery('(min-width: 500px)');
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
    const [isLargerThan1000] = useMediaQuery('(min-width: 1300px)');

    const toast = useToast()

    const cookies = new Cookies();


    const dispatch = useDispatch();
    const [currentUser, setCurrentuser] = useState({
        firstname : "",
        lastname : "",
        email : "",
        mobile : "",
        gender : ""
    });
  let emptyData = {
    firstname : "",
    lastname : "",
    email : "",
    mobile : "",
    gender : ""
};
    const [editUser, seteditUser] = useState(emptyData); 



    function handleLogout(){
        toast({
            title: 'Logging out...',

            status: 'error',
            duration: 2000,
            isClosable: true,
          })
            console.log("logout");
        setTimeout(()=>{
        SetLogin(dispatch , false);
        cookies.remove('jwt')
       },3000)

    }

    let border = {
        borderRadius : "10px"
    }
    // let currentUser = {
    //     name : "Hari Prasanth",
    //     email : "hariprasanthmath@gmail.com",
    //     mobile : "8248608590",
    //     gender : ""
    // }
    let imageAndName = {
       display:"flex",
       alignItems:"center",
       flexDirection:"column",
       justifyContent:"center",
       margin:"auto"
    }
    let centerIt = {
        display:"flex",
       alignItems:"center",
       flexDirection:"row",
       justifyContent:"center",
       border
    }
   
    const handleModalInputs = (e)=>{
        
        console.log(e.target.name, e.target.value);
        seteditUser({...editUser, [e.target.name]:e.target.value});
        
    }

    const handleSaveInput = ()=>{
        console.log(editUser);
        setCurrentuser({...editUser});
        setTimeout(()=>{
           onClose();
        },1000)
        // onClose
    }

    return (
        <div>
           
 <ChakraProvider>
 <Box backgroundColor={"#f3f7fb"} height={"100vh"}>
        <Box marginTop="600px" width="80%" margin="auto">

            <Grid
                  h='500px'
                  templateRows='repeat(6, 1fr)'
                  templateColumns='repeat(6, 1fr)'
                  gap={4}
                 >

                    {/* first */}
                      <GridItem style={border} rowSpan={2} colSpan={2} bg='white'>
                      <HStack height={"100%"} minWidth={"max-content"} padding="30px" >
                             <img src="https://www.netmeds.com/msassets/images/icons/profile-icon.svg"></img>
                              <VStack margin={"30px"}>
                              <Heading size={"md"}>{`${currentUser.firstname} ${currentUser.lastname}` }</Heading>
                              <Text fontSize={"sm"}>{currentUser.email}</Text>
                              <EditIcon boxSize={4} _hover={{width:"110%", transition: 'width ease 0.5s',boxSize:"6" , cursor:"pointer"}} onClick={onOpen }/>
 

                              </VStack>
                     </HStack>
                      </GridItem>
                      {/* second */}
                      <GridItem  rowSpan={2} colSpan={4 } bg='white' style={centerIt}> 
                      <HStack display={"flex"} flexDirection={"row"} justifyContent={"space-around"} width={"60%"} margin={"auto"}>
                        <Box style={imageAndName}> 
                            <Image src="https://www.netmeds.com/msassets/images/icons/payment_history.svg"></Image>
                            <Text>Payment Methods</Text>

                        </Box>
                        <Box style={imageAndName}>
                        <Image src="https://www.netmeds.com/msassets/images/icons/medicine_orders.svg"></Image>
                        <Text>Medicine Order</Text>
                        </Box>
                        <Box style={imageAndName}>
                        <Image src="https://www.netmeds.com/msassets/images/icons/rewards.svg"></Image>
                        <Text>My Rewards</Text>
                        </Box>
                        </HStack>   
                      </GridItem>
                      {/* third */}
                      <GridItem style={border} rowSpan={4} colSpan={2} bg='white' > 

                        <VStack margin="10%" width="80%" display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            {profileSideList.map((eachItem,index)=>{
                                if(index != profileSideList.length-1){
                                return <HStack width="100%" display={"flex"} transition={"width 0.5s ease"} justifyContent={"start"} _hover={{width:"110%", transition: 'width ease 0.5s', cursor:"pointer"}}  > 
                                <Image width="40px" src={eachItem.listImg}></Image>
                                <HStack width="100%" display={"flex"} justifyContent={"space-between"} paddingBottom={"4px"} borderBottom={index+1 < profileSideList.length ? "3px solid lightgrey" : ""}>
                                <Text>{eachItem.content}</Text>
                                <Image src="https://www.netmeds.com/msassets/images/icons/keyboard_arrow_big_right.svg"></Image>
                                </HStack>
                              </HStack>
                                }
                            })}
                            <HStack width="100%" display={"flex"} transition={"width 0.5s ease"} justifyContent={"start"} _hover={{width:"110%", transition: 'width ease 0.5s', cursor:"pointer"}} onClick={handleLogout } > 
                                <Image width="40px" src={profileSideList[profileSideList.length-1].listImg}></Image>
                                <HStack width="100%" display={"flex"} justifyContent={"space-between"} paddingBottom={"4px"} >
                                <Text>{profileSideList[profileSideList.length-1].content}</Text>
                                <Image src="https://www.netmeds.com/msassets/images/icons/keyboard_arrow_big_right.svg"></Image>
                            </HStack>
                            </HStack>

                        </VStack>
                       </GridItem>
                       {/* fourth */}
                      <GridItem style={border} rowSpan={3} colSpan={4} bg='white' > 
                        <HStack display={"flex"} justifyContent={"space-between"} padding="30px">
                            <VStack width={"40%"}>
                            <FormControl>
                                <FormLabel fontWeight={"bold"}>Login Information</FormLabel>
                                <FormLabel fontWeight={"700"} color={"lightblue"}>Email</FormLabel>
                                <Text width={"100%"} borderBottom={"2px solid lightgrey"} marginTop={"-2"}>{currentUser.email}</Text>
                                <FormHelperText>We'll never share your email.</FormHelperText>
                                <FormLabel marginTop={"6"} fontWeight={"700"} color={"lightblue"}>Mobile Number</FormLabel>
                                <Text width={"100%"} borderBottom={"2px solid lightgrey"} marginTop={"-2"}>{currentUser.mobile}</Text>
                            </FormControl>


                            </VStack>
                            <VStack width={"40%"}>
                            <FormControl>
                                <FormLabel fontWeight={"bold"}>PERSONAL INFORMATION</FormLabel>
                                <FormLabel fontWeight={"700"} color={"lightblue"}>FULL NAME</FormLabel>
                                <Text width={"100%"} borderBottom={"2px solid lightgrey"} marginTop={"-2"}>{`${currentUser.firstname} ${currentUser.lastname}` }</Text>

                                <FormLabel marginTop={"6"} fontWeight={"700"} color={"lightblue"}>Gender</FormLabel>
                                <Text width={"100%"} borderBottom={"2px solid lightgrey"} marginTop={"-2"}>{currentUser.gender.length == 0? "NO DATA" : currentUser.gender}</Text>
                            </FormControl>


                            </VStack>
                        </HStack>
                       </GridItem>
              </Grid>
           {/* </Box> */}
        </Box>
        </Box>

        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent onChange={handleModalInputs}>
          <ModalHeader>Edit details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input name="firstname" placeholder='First name' />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Last name</FormLabel>
              <Input name="lastname" placeholder='Last name' />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Email</FormLabel>
              <Input name="email" placeholder='Email Address' />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Phone</FormLabel>
              <Input name="mobile" placeholder='Phone Number' />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Gender</FormLabel>
              <Select name="gender" placeholder='Select option'>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='gender'>Other</option>
              </Select>
              
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSaveInput}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

</ChakraProvider>
        </div>
    );
}

export default Profile;