import Layout from "components/layout";
import React, { useState } from "react";
import data from "public/mock-data.json";
import { ChakraNextImage } from "components/utils";
import {
  Button,
  Text,
  Box,
  HStack,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdFastfood } from "react-icons/md";
import { CgOptions } from "react-icons/cg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TipologiaRistorante } from "lib/typings";

const RestaurantCard = ({ contact }) => (
  <HStack spacing={3}>
    <ChakraNextImage
      borderRadius={20}
      src={contact.image}
      width={200}
      height={200}
    />
    <VStack align="start">
      <Box h={10} fontWeight="bold" fontStyle="oblique">
        {contact.fullName}
      </Box>
      <HStack>
        <GoLocation w={3} h={3} />
        <Box h={5}>{contact.address}</Box>
      </HStack>
      <HStack>
        <FaPhoneAlt w={3} h={3} />
        <Box h={5}>{contact.phoneNumber}</Box>
      </HStack>
      <HStack>
        <MdEmail w={3} h={3} />
        <Box h={5}>{contact.email}</Box>
      </HStack>
    </VStack>
  </HStack>
);

const OrderButton = ({ children }) => (
  <Button
    w="full"
    p={5}
    borderRadius={10}
    _hover={{ bg: "yellow.100" }}
    colorScheme="black"
    size="s"
    variant="outline"
  >
    {children}
  </Button>
);

const ResetButton = ({ onClick }) => (
  <Button
    p={2}
    borderRadius={10}
    colorScheme="yellow"
    onClick={onClick}
    size="s"
  >
    Reset
  </Button>
);

const ProvaStack = () => {
  // FIXME: fetch from API
  const [contacts, setContacts] = useState(data);
  const [tipologia, setTipologia] = useState("Tipologia");

  return (
    <HStack align="top" p={10} shadow="md" spacing={10}>
      {/*Stack Che contiene il tutto*/}
      <VStack shadow="md" spacing={2}>
        {/*Stack per la suddivisione dei ristoranti*/}
        <HStack spacing={5}>
          {/*Stack suddividi per ordine alfabetico*/}
          <MdFastfood />
          <Text fontSize={20}>Suddividi i ristoranti</Text>
          <ResetButton onClick={null} />
        </HStack>
        <OrderButton>Ordine Alfabetico Crescente (A,Z)</OrderButton>
        <OrderButton>Ordine Alfabetico Decrescente (Z,A)</OrderButton>
        <HStack spacing={5}>
          {/*Stack suddividi per tipologia*/}
          <CgOptions />
          <Text fontSize={20}>Filtri</Text>
          <ResetButton onClick={() => setTipologia("Tipologia")} />
        </HStack>
        <Menu>
          <MenuButton
            w="full"
            px={4}
            py={2}
            fontWeight="bold"
            borderWidth="1px"
            borderRadius="md"
            _hover={{ bg: "yellow.100" }}
            _focus={{ boxShadow: "outline" }}
            _expanded={{ bg: "yellow.400" }}
            transition="all 0.2s"
          >
            &gt; {tipologia} <ChevronDownIcon />{" "}
          </MenuButton>
          <MenuList>
            {Object.values(TipologiaRistorante).map((tipo) => (
              <MenuItem key={tipo} onClick={() => setTipologia(tipo)}>
                {tipo}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </VStack>
      <VStack
        align="self-start"
        p={10}
        shadow="md"
        divider={<StackDivider borderColor="gray.200" />}
        spacing={5}
      >
        {contacts.map((contact) => (
          <RestaurantCard key={contact.id} contact={contact} />
        ))}
      </VStack>
    </HStack>
  );
};

export default function Home() {
  return (
    <Layout>
      <ProvaStack />
    </Layout>
  );
}
