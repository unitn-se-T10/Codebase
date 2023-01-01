import { useEffect, useState } from "react";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { IconContext } from "react-icons/lib";
import { MdFastfood } from "react-icons/md";
import { CgOptions } from "react-icons/cg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { TipologiaRistorante } from "lib/typings";
import { RestaurantCard2 } from "components/restaurant";
import Layout from "components/layout";

/*function ordina(ristoranti, ordine) {
  if (ordine === "Crescente") {
    ristoranti.sort((a, b) => {
      if (a.nome < b.nome) {
        return -1;
      }
      if (a.nome > b.nome) {
        return 1;
      }
      return 0;
    });
  } else if (ordine === "Decrescente") {
    ristoranti.sort((a, b) => {
      if (a.nome < b.nome) {
        return 1;
      }
      if (a.nome > b.nome) {
        return -1;
      }
      return 0;
    });
  }
}*/

const ChooseRestaurants = ({ restaurant }) => {
  const [tipologia, setTipologia] = useState("Tipologia");
  const [ordine, setOrdine] = useState("None");

  /*useEffect(() => {
    if (restaurant) {
      if (ordine === "Crescente") {
        ordina(restaurant, "Crescente");
      } else {
        ordina(restaurant, "Decrescente");
      }
    }
  }, [ordine, restaurant]);*/

  return (
    <Flex
      justify="space-evenly"
      direction="column"
      maxH={400}
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
          {tipologia} <ChevronDownIcon />
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
  const { data: session } = useSession();

  return (
    <Box
      bgImage="/sfondo2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout>
        <HStack align="top" w="80%" p={10} spacing={20}>
          <ChooseRestaurants restaurant={thumbnails} />
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
              thumbnails.map((ristorante) => (
                <RestaurantCard2
                  sessione={session}
                  key={ristorante.id}
                  thumbnail={ristorante}
                />
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
