import Layout from "components/layout";
import React, { useState } from "react";
import { TriangleDownIcon, TriangleUpIcon, DeleteIcon } from "@chakra-ui/icons";
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
  Button,
  VStack,
  HStack,
  Center,
  Container,
} from "@chakra-ui/react";

const Copertina = ({ dish }) => {
  return (
    <Container shadow="md" rounded={20}>
      <Flex p={5}>
        <Image
          maxW={{ base: "100%", sm: "150px" }}
          objectFit="cover"
          alt={dish.nome}
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
    </Container>
  );
};

const CarrelloPage = () => {
  const piatto = {
    image: "/carbonara.jpg",
    nome: "Pasta alla carbonara",
    quantita: 3,
    prezzo: 6,
    extra: "Senza uova con cipolla",
  };

  return (
    <VStack>
      <Copertina dish={piatto} />
      <Copertina dish={piatto} />
      <Copertina dish={piatto} />
    </VStack>
  );
};

export default function Ristorante() {
  return (
    <Layout>
      <CarrelloPage />
    </Layout>
  );
}
