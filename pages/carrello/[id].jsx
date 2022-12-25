import Layout from "components/layout";
import React, { useState } from "react";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  DeleteIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Spacer,
  Box,
  Stack,
  Image,
  Card,
  CardBody,
  Heading,
  CardFooter,
  Input,
  Button,
  VStack,
  HStack,
  Center,
  Container,
  StackDivider,
  Divider,
  Icon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { SlPaypal } from "react-icons/sl";
import { RiVisaFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";
import { IconContext } from "react-icons/lib";

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
            <VStack spacing={1}>
              <TriangleUpIcon />
              <TriangleDownIcon />
            </VStack>
          </HStack>
        </Center>

        <Spacer />

        <Center>
          <Text mt={2} fontSize={30}>
            {dish.prezzo * dish.quantita}€
          </Text>
        </Center>

        <Spacer />

        <Center>
          <DeleteIcon color="red.600" boxSize={7} />
        </Center>
      </Flex>
    </Box>
  );
};

const TipoPagamento = ({ logo }) => {
  return (
    <Button w={20} h={12} bgColor="#7376DA" size="lg">
      {logo.img}
    </Button>
  );
};

const NormalText = ({ testo }) => {
  return (
    <Text color="white" fontFamily="Arial" fontSize={18}>
      {testo}
    </Text>
  );
};

const Pagamento = () => {
  const mastercard = {
    img: (
      <IconContext.Provider value={{ color: "black", size: "3.5rem" }}>
        <FaCcMastercard />
      </IconContext.Provider>
    ),
  };

  const visa = {
    img: (
      <IconContext.Provider value={{ color: "black", size: "3.5rem" }}>
        <RiVisaFill />
      </IconContext.Provider>
    ),
  };

  const rupay = {
    img: (
      <IconContext.Provider value={{ color: "black", size: "3.5rem" }}>
        <SiAmericanexpress />
      </IconContext.Provider>
    ),
  };

  const paypal = {
    img: (
      <IconContext.Provider value={{ color: "black", size: "3.5rem" }}>
        <SlPaypal />
      </IconContext.Provider>
    ),
  };

  return (
    <Container shadow="md" bgColor="#565ABB" rounded={20}>
      <VStack alignItems="left" p={5}>
        <Flex>
          <Text as="b" color="white" fontFamily="Arial" fontSize={30}>
            Dettagli Carta
          </Text>
          <Spacer />
          <Image // FIXME: Fetchare le API per l'immagine utente
            maxW={{ base: "30%", sm: "50px" }}
            objectFit="cover"
            alt="img"
            rounded={10}
            src="/profile.png"
          ></Image>
        </Flex>
        <StackDivider />
        <StackDivider />
        <NormalText testo={"Tipologia Carta"} />
        <Flex>
          <TipoPagamento logo={mastercard} />
          <Spacer />
          <TipoPagamento logo={visa} />
          <Spacer />
          <TipoPagamento logo={rupay} />
          <Spacer />
          <TipoPagamento logo={paypal} />
        </Flex>

        <FormControl>
          <FormLabel color="white" fontFamily="Arial" fontSize={18}>
            Nome sulla carta
          </FormLabel>
          <Input
            color="gainsboro"
            _placeholder={{ color: "gainsboro" }}
            bgColor="#7376DA"
            placeholder="Nome Cognome"
            type="text"
          />
        </FormControl>

        <FormControl>
          <FormLabel color="white" fontFamily="Arial" fontSize={18}>
            Numero Carta
          </FormLabel>
          <Input
            color="gainsboro"
            _placeholder={{ color: "gainsboro" }}
            bgColor="#7376DA"
            inputmode="numeric"
            maxlength="16"
            placeholder="1111 2222 3333 4444"
            type="tel"
          />
        </FormControl>

        <HStack sapcing={5}>
          <FormControl>
            <FormLabel color="white" fontFamily="Arial" fontSize={18}>
              Data di scadenza
            </FormLabel>
            <Input
              color="gainsboro"
              _placeholder={{ color: "gainsboro" }}
              bgColor="#7376DA"
              placeholder="mm/yy"
              type="text"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="white" fontFamily="Arial" fontSize={18}>
              CVV
            </FormLabel>
            <Input
              color="gainsboro"
              _placeholder={{ color: "gainsboro" }}
              bgColor="#7376DA"
              maxlength="3"
              placeholder="123"
              type="tel"
            />
          </FormControl>
        </HStack>
        <Divider borderColor="#565ABB" />
        <Divider borderColor="#7376DA" />

        <Flex>
          {
            // FIXME: Fetchare le API per il totale
          }
          <NormalText testo={"SubTotal"} />
          <Spacer />
          <NormalText testo={"1000€"} />
        </Flex>

        <Flex>
          {
            // FIXME: Fetchare le API per il totale
          }
          <NormalText testo={"Sconto"} />
          <Spacer />
          <NormalText testo={"1€"} />
        </Flex>

        <Flex>
          {
            // FIXME: Fetchare le API per il totale
          }
          <NormalText testo={"Totale"} />
          <Spacer />
          <NormalText testo={"999€"} />
        </Flex>

        <Divider borderColor="#565ABB" />
        <Divider borderColor="#7376DA" />
        <Divider borderColor="#565ABB" />

        <Button
          w="full"
          h={57}
          bgColor="#4DE1C1"
          rightIcon={<ArrowForwardIcon />}
        >
          <Flex w="full">
            {
              // FIXME: Fetchare le API per il totale
            }
            <NormalText testo={"999€"} />
            <Spacer />
            <NormalText testo={"Checkout"} />
          </Flex>
        </Button>
      </VStack>
    </Container>
  );
};

const CarrelloPage = () => {
  const piatto = {
    image: "/carbonara.jpg",
    nome: "Pasta alla carbonara",
    quantita: 3,
    prezzo: 6,
    extra: "Senza uova, senza pancetta",
  };

  return (
    <Stack alignItems="center" direction={{ base: "column", lg: "row" }} p={10}>
      <VStack alignItems="left" p={5} spacing={3}>
        <HStack>
          <ArrowBackIcon boxSize={5} />
          <Text as="b" fontSize={18} fontStyle="Arial">
            Torna al ristorante
          </Text>
        </HStack>

        <Divider borderColor="gray.300" />
        <Divider borderColor="white" />
        {
          // FIXME: Aggiungere i piatti in base all'ordine del carrello API
        }
        <VStack alignItems="left" spacing={-1}>
          <Text fontSize={18} fontWeight="semibold" fontStyle="Arial">
            Carrello
          </Text>
          <Text fontSize={14} fontStyle="Arial">
            Hai 3 elementi nel carrello
          </Text>
        </VStack>
        <Divider borderColor="white" />
        <Copertina dish={piatto} />
        <Copertina dish={piatto} />
        <Copertina dish={piatto} />
      </VStack>
      <Spacer />
      <Pagamento />
    </Stack>
  );
};

export default function Ristorante() {
  return (
    <Layout>
      <CarrelloPage />
    </Layout>
  );
}
