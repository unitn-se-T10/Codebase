import Layout from "components/layout";
import {
  VStack,
  Box,
  Text,
  Input,
  Avatar,
  Divider,
  InputGroup,
  InputRightElement,
  Flex,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Modal,
  HStack,
  Spacer,
  Image,
  Heading,
  Center,
  StackDivider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

const piatto1 = {
  image: "/carbonara.jpg",
  nome: "Pasta alla carbonara",
  quantita: 1,
  prezzo: 6.6,
  extra: "Senza uova, senza pancetta",
};

const piatto2 = {
  image: "/spaghetti.jpg",
  nome: "Pasta al tonno",
  quantita: 4,
  prezzo: 4.5,
  extra: "",
};

const piatto3 = {
  image: "/pizzeria.jpeg",
  nome: "Pizza margherita",
  quantita: 2,
  prezzo: 7.5,
  extra: "Abbondante mozzarella",
};

const piatto4 = {
  image: "/bistecca.jpeg",
  nome: "Bistecca ai ferri",
  quantita: 3,
  prezzo: 10.5,
  extra: "Aggiunta patate al forno",
};

const utente1 = {
  nome: "Alessandro",
  cognome: "Bianchi",
  email: "alessandro.bianchi@gmail.com",
  avatar: "https://avatars.dicebear.com/api/male/beard/white/username.svg",
  pietanze: [piatto1, piatto2, piatto3],
};

const utente2 = {
  nome: "Matteo",
  cognome: "Rossi",
  email: "matteo.rossi@gmail.com",
  avatar: "https://avatars.dicebear.com/api/male/white/surprised0/username.svg",
  pietanze: [piatto1, piatto4],
};

const utente3 = {
  nome: "Matilde",
  cognome: "Verdi",
  email: "matilde.verdi@gmail.com",
  avatar: "https://avatars.dicebear.com/api/female/glasses/username.svg",
  pietanze: [piatto2, piatto3],
};

const Copertina = ({ dish }) => {
  return (
    <Box w={750} shadow="0px 0px 2px 1px gainsboro" rounded={20}>
      <Flex p={5}>
        <Image
          maxW={{ base: "20%", sm: "150px" }}
          objectFit="cover"
          alt={dish.nome}
          rounded={10}
          src={dish.image}
        />
        <Spacer />

        <Center>
          <VStack alignItems="center" p={2} spacing={-1}>
            <Heading size="md">{dish.nome}</Heading>
            <Text py="2">{dish.extra}</Text>
          </VStack>
        </Center>

        <Spacer />

        <Center>
          <HStack>
            <Text mt={2} fontSize={30}>
              {dish.quantita}
            </Text>
          </HStack>
        </Center>

        <Spacer />

        <Center>
          <Text mt={2} fontSize={30}>
            {dish.prezzo * dish.quantita}€
          </Text>
        </Center>

        <Spacer />
      </Flex>
    </Box>
  );
};

const utenti = [utente1, utente2, utente3];

const UtenteCard = ({ utente, id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const accetta = useToast();
  const rifiuta = useToast();

  return (
    <Flex align="center" w="70%" p={3} bgColor="white" rounded={20} spacing={2}>
      <Avatar size="lg" src={utente.avatar} />
      <Spacer />
      <VStack spacing={-0.1}>
        <HStack>
          <Text fontSize={20} fontWeight="semibold">
            {utente.nome}
          </Text>
          <Text fontSize={20} fontWeight="semibold">
            {utente.cognome}
          </Text>
        </HStack>
        <Text fontSize={15}>{utente.email}</Text>
      </VStack>
      <Spacer />
      <Button onClick={onOpen}>
        {" "}
        Visualizza ordine
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW="56rem">
            <ModalHeader>
              Ordine di {utente.nome} {utente.cognome}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {utente.pietanze.map((pietanzaId, i) => (
                //setTotale(totale + piatto.prezzo * piatto.quantita),
                <Copertina dish={utente.pietanze[i]} key={pietanzaId} id={i} />
              ))}
            </ModalBody>
            <ModalFooter>
              <HStack>
                <Button
                  _hover={{ bgColor: "darkgreen" }}
                  _active={{ bgColor: "darkgreen" }}
                  bgColor="green.500"
                  onClick={() => {
                    accetta({
                      title: "Hai accettato l'ordine.",
                      description: "Verrà inviata una mail all'utente.",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    onClose();
                  }}
                >
                  Accetta
                </Button>
                <Spacer />
                <Button
                  _hover={{ bgColor: "darkred" }}
                  _active={{ bgColor: "darkred" }}
                  bgColor="red.500"
                  onClick={() => {
                    rifiuta({
                      title: "Hai rifiutato l'ordine.",
                      description: "Verrà inviata una mail all'utente.",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                    onClose();
                  }}
                >
                  Rifiuta
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Button>
    </Flex>
  );
};

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
        <Center mt={10}>
          <VStack
            align="center"
            w="60%"
            p={10}
            bgColor="white"
            rounded={20}
            spacing={1}
          >
            <Text fontSize={30} fontWeight="semibold">
              I miei ordini
            </Text>
            <Divider w="70%" borderColor="gainsboro" />
            {utenti.map((utenteId, i) => (
              <>
                <UtenteCard utente={utenteId} id={i} key={i} />
                <Divider w="70%" borderColor="gainsboro" />
              </>
            ))}
          </VStack>
        </Center>
      </Layout>
    </Box>
  );
}
