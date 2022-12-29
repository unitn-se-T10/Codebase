import Layout from "components/layout";
import {
  VStack,
  HStack,
  Text,
  Button,
  Divider,
  Center,
  Wrap,
  WrapItem,
  Flex,
  Spinner,
  Box,
  Link,
  Spacer,
  TagLeftIcon,
} from "@chakra-ui/react";
import { StarIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { TipologiaMenu } from "lib/typings";
import { ImAlarm } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { DishCard } from "components/dish";
import { MdEmail } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { ChakraNextImage } from "components/utils";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const DishList = ({ menu, sessione }) =>
  menu ? (
    <Wrap justify="space-evenly" p={5} spacing={10}>
      {menu.piatti.map((dish) => (
        <WrapItem key={dish.id}>
          <DishCard dish={dish} session={sessione} />
        </WrapItem>
      ))}
    </Wrap>
  ) : (
    <Text>Non ci sono piatti in questo menu</Text>
  );

const MenuTabs = ({ menus, data }) => {
  if (!menus) return <Spinner />;
  return (
    <TabPanels>
      {Object.values(TipologiaMenu).map((tipologia) => (
        <TabPanel key={tipologia}>
          <DishList
            sessione={data}
            menu={menus.find((menu) => menu.tipologia === tipologia)}
          />
        </TabPanel>
      ))}
    </TabPanels>
  );
};

const ModificaRistorante = () => {
  return (
    <Link href="/utente/aggiungiristorante">
      <Button bgColor="tomato">Modifica</Button>
    </Link>
  );
};

const ReturnIcon = () => {
  return (
    <Link href="/ristoranti">
      <Button
        _hover={{ color: "gray" }}
        _active={{ bgColor: "transparent" }}
        bgColor="transparent"
      >
        <ArrowBackIcon
          _hover={{ color: "gainsboro" }}
          boxSize={6}
          color="black"
        />
      </Button>
    </Link>
  );
};

export default function Ristorante({ ristorante }) {
  function arrayFetcher(...urlArr) {
    const f = (u) => fetch(u).then((r) => r.json().then((j) => j.menu));
    return Promise.all(urlArr.map(f));
  }

  const menuUrls = ristorante.menuIds.map(
    (id) => `${process.env.NEXT_PUBLIC_SITE_URL}/api/menu?id=${id}`
  );
  const { data: menus } = useSWR(menuUrls, arrayFetcher);

  const { data: session } = useSession();

  return (
    <Box
      bgImage="/sfondo2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout>
        <Center>
          <VStack
            alignItems="center"
            w="55%"
            mt={10}
            p={4}
            bgColor="white"
            rounded={20}
            spacing={4}
          >
            <HStack spacing={5}>
              <ReturnIcon />
              <ChakraNextImage
                borderRadius={20}
                alt={ristorante.nome}
                src={`data:image/jpg;base64,${ristorante.immagine}`}
                width={200}
                height={200}
              />
              <Spacer />
              <VStack alignItems="start">
                <Text fontSize={20} fontWeight="bold">
                  {ristorante.nome}
                </Text>
                <HStack spacing={2}>
                  {[...Array(5).keys()].map((i) =>
                    i < ristorante.valutazione ? (
                      <StarIcon boxSize={6} key={i} color="yellow.500" />
                    ) : (
                      <StarIcon boxSize={6} key={i} color="gainsboro" />
                    )
                  )}
                </HStack>

                <HStack>
                  <GoLocation width={3} height={3} />
                  <Text>{ristorante.indirizzo}</Text>
                </HStack>
                <HStack>
                  <ImAlarm width={3} height={3} />
                  <Text>{ristorante.orariApertura}</Text>
                </HStack>
                <HStack>
                  <FaPhoneAlt width={3} height={3} />
                  <Text>{ristorante.telefono}</Text>
                </HStack>
                <HStack>
                  <MdEmail width={3} height={3} />
                  <Text>{ristorante.email}</Text>
                </HStack>
              </VStack>
              <Spacer />
              {session?.user?.isGestore ? <ModificaRistorante /> : null}
            </HStack>
            <Divider borderColor="black" />
            <Tabs
              align="center"
              colorScheme="orange"
              size="md"
              variant="soft-rounded"
            >
              <TabList>
                {Object.values(TipologiaMenu).map((tipologia) => (
                  <Tab key={tipologia}>{tipologia}</Tab>
                ))}
              </TabList>
              <MenuTabs data={session} menus={menus} />
            </Tabs>
          </VStack>
        </Center>
      </Layout>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/restaurant?id=${id}`
  );
  if (res.status !== 200) {
    return {
      notFound: true,
    };
  }
  const ristorante = await res.json();

  return {
    props: {
      ristorante: ristorante.ristorante,
    },
  };
}
