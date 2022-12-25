import Layout from "components/layout";
import React, { useState } from "react";
import { Grid, GridItem, StackDivider } from "@chakra-ui/react";
import {
  VStack,
  Box,
  HStack,
  Text,
  Divider,
  Flex,
  Spacer,
  Center,
  Container,
  Button,
} from "@chakra-ui/react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiEggClutch, GiWheat } from "react-icons/gi";
import { StarIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const RistorantePage = ({ risto, menu, dish }) => {
  return (
    <Center>
      <VStack alignItems="center" p={4} spacing={4}>
        <HStack spacing={5}>
          <Box
            w={200}
            h={200}
            bgImage={risto.image}
            bgSize="cover"
            bgPosition="center"
            bgRepeat="no-repeat"
            borderRadius={20}
          />
          <VStack alignItems="start">
            <Text fontSize={20} fontWeight="bold">
              {risto.fullName}
            </Text>
            <HStack spacing={2}>
              {[...Array(5).keys()].map((i) =>
                i < risto.valutazione ? (
                  <StarIcon boxSize={6} key={i} color="yellow.500" />
                ) : (
                  <StarIcon boxSize={6} key={i} color="gainsboro" />
                )
              )}
            </HStack>
            <Text>Indirizzo: {risto.address}</Text>
            <HStack>
              <Text>
                Orari:
                {
                  // TODO: Mettere aperto o chiuso in base al current time e alle informazioni reperite tramite API
                }
              </Text>
              <Text>Chiude alle ore:</Text>
              <Text>
                {
                  // TODO: Mettere gli orari prese dall'API
                }
              </Text>
              <TriangleDownIcon />
            </HStack>
            <Text>Telefono: {risto.phoneNumber}</Text>
          </VStack>
        </HStack>
        <Divider borderColor="black" />
        <Tabs
          align="center"
          colorScheme="orange"
          size="md"
          variant="soft-rounded"
        >
          {
            // FIXME: Mettere a posto tutte le tab list, al momento sono statiche e fatte a mano
          }
          <TabList>
            <Tab>Antipasti</Tab>
            <Tab>Primi piatti</Tab>
            <Tab>Secondi piatti</Tab>
            <Tab>Contorni</Tab>
            <Tab>Dessert</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Text>Da riempire</Text>
            </TabPanel>
            <TabPanel>
              <VStack spacing={10}>
                <HStack spacing={10}>
                  <DishCard dish={dish} />
                  <DishCard dish={dish} />
                </HStack>
                <HStack spacing={10}>
                  <LT dish={dish} />
                  <LT dish={dish} />
                </HStack>
                <HStack spacing={10}>
                  <DishCard dish={dish} />
                  <DishCard dish={dish} />
                </HStack>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Center>
  );
};

const Allergene = ({ icona }) => {
  return (
    <VStack>
      {icona.icon}
      <Text fontSize={10}>{icona.text}</Text>
    </VStack>
  );
};

const LT = ({ dish }) => {
  const uova = {
    icon: <GiEggClutch size="1.75em" />,
    text: "Uova",
  };

  const grano = {
    icon: <GiWheat size="1.75em" />,
    text: "Grano",
  };

  return (
    <Box
      w={400}
      p={5}
      shadow="0px 0px 5px 1px gainsboro"
      bgColor="white"
      rounded={50}
    >
      <Flex>
        <Box
          w={100}
          h={100}
          bgImage={dish.image}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          rounded={50}
        ></Box>
        <Spacer />
        <VStack>
          <Text>{dish.nome}</Text>
          <Divider borderColor="black" />
          <HStack>
            {/* FIXME: Mettere tutti gli allergeni della pietanza*/}
            <Allergene icona={uova} />
            <Allergene icona={grano} />
          </HStack>
        </VStack>
        <Spacer />
        <Box w={70} h={70} fontSize={20} borderWidth="1px" borderRadius={50}>
          <Flex align="center" direction="column" h="70%">
            <Spacer />
            {dish.prezzo} €
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

const DishCard = ({ dish }) => {
  const uova = {
    icon: <GiEggClutch size="1.75em" />,
    text: "Uova",
  };

  const grano = {
    icon: <GiWheat size="1.75em" />,
    text: "Grano",
  };

  return (
    <Box w={400} p={5} borderRadius={50} bgColor="yellow.200">
      <Flex>
        <Box
          w={100}
          h={100}
          bgImage={dish.image}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          borderRadius={50}
        ></Box>
        <Spacer />
        <VStack>
          <Text>{dish.nome}</Text>
          <Divider borderColor="black" />
          <HStack>
            {/* FIXME: Mettere tutti gli allergeni della pietanza*/}
            <VStack>
              <Allergene icona={uova} />
            </VStack>

            <VStack>
              <Allergene icona={grano} />
            </VStack>
          </HStack>
        </VStack>
        <Spacer />
        <Box w={70} h={70} fontSize={20} borderRadius={50} bgColor="green.300">
          <Flex align="center" direction="column" h="70%">
            <Spacer />
            {dish.prezzo} €
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default function Ristorante() {
  // TODO: Da fetchare dalle APIs
  const piatto = {
    id: "1",
    nome: "Pasta alla carbonara",
    prezzo: 6,
    image: "/carbonara.jpg",
  };

  // TODO: Da fetchare dalle APIs
  const ristorante = {
    id: 1,
    image: "/image1.jpg",
    fullName: "Ristorante da Luca Tecchio",
    address: "Via Martiri della Libertà, 80",
    phoneNumber: "338-982-3491",
    email: "ristorante.da.Luca@aziendaImportante.it",
    valutazione: 4,
  };

  // TODO: Da fetchare dalle APIs
  const menu = {};

  return (
    <Layout>
      <RistorantePage risto={ristorante} menu={menu} dish={piatto} />
    </Layout>
  );
}
