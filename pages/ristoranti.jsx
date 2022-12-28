import Layout from "components/layout";
import { useState } from "react";
import {
  Button,
  Text,
  Box,
  HStack,
  VStack,
  StackDivider,
  Spacer,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { IconContext } from "react-icons/lib";
import { MdFastfood } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CgOptions } from "react-icons/cg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TipologiaRistorante } from "lib/typings";
import useSWR from "swr";
import { RestaurantCard } from "components/restaurant";

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

export default function Home() {
  const start = 0;
  const num = 10;

  const fetcher = (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((j) => j.ristoranti);

  const { data: thumbnails } = useSWR(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/thumbnails?start=${start}&num=${num}`,
    fetcher
  );

  return (
    <Box
      bgImage="/sfondo2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout>
        <HStack align="top" w="80%" p={10} spacing={20}>
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
            {thumbnails ? (
              thumbnails.map((thumbnail) => (
                <RestaurantCard key={thumbnail.id} thumbnail={thumbnail} />
              ))
            ) : (
              <Spinner />
            )}
          </VStack>
        </HStack>
      </Layout>
    </Box>
  );
}
