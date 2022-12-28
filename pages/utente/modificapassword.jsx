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
  Link,
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

const Modifica = () => {
  return (
    <Flex direction="column" w="35%" p={10} bgColor="white" rounded={40}>
      <Text align="center" p={2} color="black" fontSize={40} fontWeight="bold">
        Cambia Password
      </Text>
      <Spacer />
      <Divider borderColor="white" />
      <Spacer />
      <VStack spacing={5}>
        <PasswordForm label={"Password Attuale"} />
        <PasswordForm label={"Nuova password"} />
        <PasswordForm label={"Conferma password"} />
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
        <Link href="http://localhost:3000/utente/1">
          <Button _hover={{ bgColor: "black" }} bgColor="gray.500">
            Annulla
          </Button>
        </Link>
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
        <VStack alignItems="center" p={20} spacing={10}>
          <Modifica />
        </VStack>
      </Layout>
    </Box>
  );
}
