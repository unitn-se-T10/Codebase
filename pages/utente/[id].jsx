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
  Stack,
  Center,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { IconContext } from "react-icons/lib";
import { GoLocation } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdFastfood } from "react-icons/md";
import { CgOptions } from "react-icons/cg";
import { ChevronDownIcon, EditIcon } from "@chakra-ui/icons";
import { TipologiaRistorante } from "lib/typings";

const user = {
  nome: "Canial",
  cognome: "Utis",
  email: "a@b.c",
  password: "********",
};

const LabelText = ({ label, txt }) => {
  return (
    <VStack alignItems="left">
      <Text fontSize={15} fontWeight="semibold">
        {label}
      </Text>
      <Flex>
        <Text color="gray">{txt}</Text>
        <Spacer />
        <EditIcon />
      </Flex>
      <Divider borderColor="gray.400" />
      <Divider borderColor="white" />
    </VStack>
  );
};

const ModificaText = ({ label, txt }) => {
  return (
    <VStack alignItems="left">
      <Text fontSize={15} fontWeight="semibold">
        {label}
      </Text>
      <Flex align="center">
        <Text color="gray">{txt}</Text>
        <Spacer />
        <Button bgColor="#FF3D00">
          <Text color="white" fontSize={15} fontWeight="semibold">
            Modifica
          </Text>
        </Button>
      </Flex>
      <Divider borderColor="gray.400" />
      <Divider borderColor="white" />
    </VStack>
  );
};

const PaginaUtente = () => {
  return (
    <Flex direction="column" w="70%" p={10} bgColor="white" rounded={40}>
      <Text align="center" fontSize={30} fontWeight="bold">
        Il mio profilo
      </Text>
      <LabelText label={"Nome"} txt={user.nome} />
      <LabelText label={"Cognome"} txt={user.cognome} />
      <ModificaText label={"Email"} txt={user.email} />
      <ModificaText label={"Password"} txt={user.password} />
      <Text
        align="center"
        color="whiteAlpha.100"
        fontSize={50}
        fontWeight="bold"
      >
        Il mio profilo
      </Text>
      <HStack justify="center" spacing={10}>
        <Button bgColor="#FF3D00">Applica modifiche</Button>
        <Button _hover={{ bgColor: "black" }} bgColor="gray.500">
          Annulla
        </Button>
      </HStack>
    </Flex>
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
        <VStack alignItems="center" p={10} spacing={10}>
          <PaginaUtente />
        </VStack>
      </Layout>
    </Box>
  );
}
