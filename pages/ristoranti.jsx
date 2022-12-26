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
  Spacer,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { IconContext } from "react-icons/lib";
import { GoLocation } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdFastfood } from "react-icons/md";
import { CgOptions } from "react-icons/cg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TipologiaRistorante } from "lib/typings";

const ChooseRestaurants = () => {
  const [tipologia, setTipologia] = useState("Tipologia");
  const [ordine, setOrdine] = useState("None");

  return (
    <Flex
      justify="space-evenly"
      direction="column"
      p={5}
      shadow="1px 1px 5px 1px gray"
      bgColor="white"
      rounded={20}
    >
      <Flex align="center">
        <IconContext.Provider value={{ size: "20px" }}>
          <MdFastfood />
        </IconContext.Provider>
        <Spacer />
        <Text fontSize={20}>Suddividi i ristoranti</Text>
        <Spacer />
        <ResetButton onClick={() => setOrdine("None")} />
      </Flex>
      <OrderButton
        bgColor={ordine === "Crescente" ? "yellow.300" : "white"}
        onClick={() => setOrdine("Crescente")}
      >
        Ordine Alfabetico Crescente (A,Z)
      </OrderButton>
      <OrderButton
        bgColor={ordine === "Decrescente" ? "yellow.300" : "white"}
        onClick={() => setOrdine("Decrescente")}
      >
        Ordine Alfabetico Decrescente (Z,A)
      </OrderButton>
      <Flex align="center">
        <IconContext.Provider value={{ size: "22px" }}>
          <CgOptions />
        </IconContext.Provider>
        <Spacer />
        <Text fontSize={20}>Filtri</Text>
        <Spacer />
        <ResetButton onClick={() => setTipologia("Tipologia")} />
      </Flex>
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
          {tipologia} <ChevronDownIcon />{" "}
        </MenuButton>
        <MenuList>
          {Object.values(TipologiaRistorante).map((tipo) => (
            <MenuItem key={tipo} onClick={() => setTipologia(tipo)}>
              {tipo}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

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

const OrderButton = ({ children, ...props }) => (
  <Button
    w="full"
    p={5}
    borderRadius={10}
    colorScheme="black"
    size="s"
    variant="outline"
    {...props}
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

  return (
    <HStack align="top" p={10} spacing={20}>
      {/*Stack Che contiene il tutto*/}
      <ChooseRestaurants />
      <VStack
        align="self-start"
        w="full"
        p={10}
        shadow="1px 1px 5px 1px gray"
        bgColor="white"
        divider={<StackDivider borderColor="gray.200" />}
        rounded={20}
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
    <Box
      bgImage="/sfondo2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout>
        <ProvaStack />
      </Layout>
    </Box>
  );
}
