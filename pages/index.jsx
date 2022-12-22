import Layout from "components/layout";
import React, { useState } from "react";
import data from "public/mock-data.json";
import typo from "public/tipologie.json";
import {ChakraNextImage} from "components/utils"
import { Button, Text, Stack, Box, HStack, VStack, StackDivider } from '@chakra-ui/react' 
import { Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider} from '@chakra-ui/react'
import { GoLocation } from 'react-icons/go'
import { FaPhoneAlt } from 'react-icons/fa'
import { MdEmail, MdFastfood } from 'react-icons/md'
import { AiOutlineDown } from 'react-icons/ai'
import { CgOptions } from 'react-icons/cg'
import { ChevronDownIcon } from '@chakra-ui/icons'

const ProvaStack = () => { // Vstack (contente per riga un ristorante) + HStack con Vstack
  const [contacts, setContacts] = useState(data);
  const [typos, setTypos] = useState(typo);
  const [tipologia, setTipologia] = useState("Tipologia");

  return(
  <HStack shadow="md" spacing={10} align="top" p={10}> {/*Stack Che contiene il tutto*/}
    
    <VStack shadow="md" spacing={2}> {/*Stack per la suddivisione dei ristoranti*/}
      
      <HStack spacing={5}> {/*Stack suddividi per ordine alfabetico*/}
        <MdFastfood/>
        <Text fontSize={20}>Suddividi i ristoranti</Text>
        <Button size="s" p={2} colorScheme="yellow" borderRadius={10}>Reset</Button>
      </HStack>
      
      <Button _hover={{ bg: 'yellow.100' }} size="s" width="full" p={5} variant='outline' colorScheme="black" borderRadius={10}>Ordine Alfabetico Crescente (A,Z)</Button>
      <Button _hover={{ bg: 'yellow.100' }} size="s" width="full" p={5} variant='outline' colorScheme="black" borderRadius={10}>Ordine Alfabetico Decrescente (Z,A)</Button>

      <HStack spacing={5}> {/*Stack suddividi per tipologia*/}
        <CgOptions/>
        <Text fontSize={20}>Filtri</Text>
        <Button onClick = {() => setTipologia("Tipologia")} size="s" p={2} colorScheme="yellow" borderRadius={10}>Reset</Button>
      </HStack>

      <Menu>
        <MenuButton 
            px={4}
            py={2}
            fontWeight="bold"
            width="full"
            transition='all 0.2s'
            borderRadius='md'
            borderWidth='1px'
            _hover={{ bg: 'yellow.100' }}
            _expanded={{ bg: 'yellow.400' }}
            _focus={{ boxShadow: 'outline' }}>
              {tipologia} <ChevronDownIcon/> </MenuButton>
        <MenuList>
          {
            typos.map((tipo) => (
              <MenuItem onClick = {() => setTipologia(tipo.name)} >{tipo.name}</MenuItem>
            ))
          }
      </MenuList>
    </Menu>

    </VStack>

    <VStack
    divider={<StackDivider borderColor='gray.200' />} 
    shadow="md" spacing={5} align="self-start" p={10}> 
      {contacts.map((contact)=> ( 
        <HStack spacing={3}>
          <ChakraNextImage borderRadius={20} src={contact.image} width={200} height={200}/>
          <VStack align="start">
             <Box h={10} fontStyle="oblique" fontWeight="bold">
              {contact.fullName}
             </Box>
             <HStack>
              <GoLocation w={3} h={3}/>
              <Box h={5}>
                {contact.address}
              </Box>
             </HStack>
             <HStack>
              <FaPhoneAlt w={3} h={3}/>
              <Box h={5}>
                {contact.phoneNumber}
              </Box>
             </HStack>
             <HStack>
              <MdEmail w={3} h={3}/>
              <Box h={5}>
                {contact.email}
              </Box>
             </HStack>
          </VStack>
        </HStack>
      ))}
    </VStack>
  </HStack>
  
  );
}

export default function Home() {
  return (
    <Layout>
        <ProvaStack/>
    </Layout>
  );
}
