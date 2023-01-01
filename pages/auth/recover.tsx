import React from "react";
import {
  Box,
  Flex,
  Divider,
  VStack,
  Text,
  FormControl,
  Input,
  Spacer,
  Button,
  HStack,
  FormLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "components/layout";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      bgImage="/sfondo2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout>
        <VStack alignItems="center" p={10} spacing={10}>
          <Flex
            align="center"
            direction="column"
            w="35%"
            p={10}
            bgColor="white"
            rounded={40}
          >
            <Text
              align="center"
              p={2}
              color="black"
              fontSize={40}
              fontWeight="bold"
            >
              Recupera password
            </Text>
            <Spacer />
            <Text align="center" color="black" fontSize={14}>
              Se hai dimenticato la password del tuo account, quest&apos;area ti
              permette di recuperarla.
            </Text>
            <Spacer />
            <Divider p={2} borderColor="black" />
            <Spacer />
            <FormControl p={2}>
              <FormLabel>Inserisci la tua email</FormLabel>
              <Input placeholder="youremail@host.tld"></Input>
            </FormControl>
            <Spacer />
            <Text color="white" fontSize={30}>
              PROVA
            </Text>
            <HStack justify="center" spacing={10}>
              <Button bgColor="#FF3D00" onClick={() => router.push("/")}>
                Conferma
              </Button>
              <Button
                _hover={{ bgColor: "black" }}
                _active={{ bgColor: "black" }}
                bgColor="gray.500"
                onClick={() => router.push("/")}
              >
                Annulla
              </Button>
            </HStack>
          </Flex>
        </VStack>
      </Layout>
    </Box>
  );
}
