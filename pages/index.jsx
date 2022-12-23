import Layout from "components/layout";
import React, { useState } from "react";
import { Button, Flex, Text, Stack, Box, HStack, VStack, 
    StackDivider, ChakraProvider, Image, Textarea, InputGroup, InputRightElement } from '@chakra-ui/react' 
import { Input, Divider, FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Checkbox, Link, CheckboxGroup } from '@chakra-ui/react'
import { FcGoogle } from "react-icons/fc"


const Login = () => {
    
    const Background = "/Sfondo1.jpg"
    const Logo = "/Logo.png"
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [text, setText] = React.useState("Indirizzo Email")
    const textClear = () => setText("")
    const textAppear = () => setText("Indirizzo Email")
    const [password, setPassword] = React.useState("Password")
    const passClear = () => setPassword("")
    const passAppear = () => setPassword("Password")
    const [textDecoration, setDecoration] = React.useState("underline")
    const decorationClear = () => setDecoration("underline")
    const decorationAppear = () => setDecoration("")

    return (
        <VStack p={20} spacing={5} bgImg={Background}>
            <Image boxSize={120} src={Logo}/>
            <VStack borderRadius={20} p={10} align="left" spacing={5} bgColor="gray.200">
                <Text fontWeight="bold" fontSize={24}>Accedi</Text>
                <FormControl>
                    <Input
                        borderColor="black.100"
                        bgColor="orange.400" 
                        placeholder={text}
                        _placeholder={{opacity : 2, color : "black"}}
                        type='email'
                        onMouseEnter={textClear}
                        onMouseLeave={textAppear}
                    />
                </FormControl>
                
                <FormControl>
                    <InputGroup>
                        <Input 
                            borderColor="black.100"
                            bgColor="orange.400" 
                            placeholder={password} 
                            _placeholder={{opacity : 2, color : "black"}}
                            type={show ? 'text' : 'password'}
                            onMouseEnter={passClear}
                            onMouseLeave={passAppear}
                        />
                        <InputRightElement children={<AiOutlineEyeInvisible/>}>
                        <Button bgColor="transparent" size='sm' onClick={handleClick}>
                            {show ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
                        </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <HStack spacing={10}>
                    <Checkbox>Ricordami</Checkbox>
                    <Link textDecorationLine={textDecoration} color='red.500' href='recuperaPassword'
                    onMouseOver={decorationAppear}
                    onMouseOut={decorationClear}>
                    Password dimenticata?
                    </Link>
                </HStack>
                
                <Button opacity={0.8}bgColor="orangered">Connettiti</Button>
                
                <StackDivider/>
                <VStack divider={<StackDivider borderColor='black' />}>
                <></><></>
                </VStack>
                <StackDivider/>

                <Button
                    leftIcon={<FcGoogle/>}
                    p={4}
                    textColor="black"
                    variant='outline'>
                    Login with Google
                </Button>

                <HStack align="center" spacing={10}>
                    <Text>Non hai un account?</Text>
                    <Link href="Registrati" color="darkblue">Registrati</Link>
                </HStack>
            </VStack>
        </VStack>
    );
}

export default function Home() {
    return (
      <Layout> 
        <Login />  
      </Layout>
    );
  }