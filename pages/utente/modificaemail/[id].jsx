import Layout from "components/layout";
import React, { useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Spacer,
  Button,
  Divider,
  HStack,
  InputRightElement,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const LabelForm = ({ label, type }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input type={type} />
    </FormControl>
  );
};

const PasswordForm = ({ label }) => {
  const [show, setShow] = useState(false);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input type={show ? "text" : "password"} />
        <InputRightElement>
          <IconButton
            color="black"
            aria-label="Toggle password visibility"
            bgColor="transparent"
            icon={show ? <ViewIcon /> : <ViewOffIcon />}
            onClick={() => setShow(!show)}
            size="sm"
          />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

const Modifica = ({ email }) => {
  return (
    <Flex direction="column" w="65%" p={10} bgColor="white" rounded={40}>
      <Text align="center" p={2} color="black" fontSize={40} fontWeight="bold">
        Modifica Email
      </Text>
      <Spacer />
      <VStack alignItems="left" spacing={-1}>
        <Text>Attuale indirizzo email</Text>
        <Text>{email}</Text>
      </VStack>
      <VStack spacing={3}>
        <Spacer />
        <LabelForm label={"Nuova email"} type="text" />
        <Spacer />
        <LabelForm label={"Conferma nuova email"} type="text" />
        <Spacer />
        <PasswordForm label={"Password"} />
      </VStack>
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
  const utente = {
    email: "a@b.c",
    password: "Bocchi1.",
  };

  return (
    <Box
      bgImage="/sfondo2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout>
        <VStack alignItems="center" p={20} spacing={10}>
          <Modifica email={utente.email} />
        </VStack>
      </Layout>
    </Box>
  );
}
