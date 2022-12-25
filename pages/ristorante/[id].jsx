import Layout from "components/layout";
import {
  VStack,
  Box,
  HStack,
  Text,
  Divider,
  Center,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { StarIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { TipologiaMenu, Allergene } from "lib/typings";
import { DishCard } from "components/dish";

const DishList = ({ menu }) =>
  menu ? (
    <Wrap justify="space-evenly" p={5} spacing={10}>
      {menu.piatti.map((dish) => (
        <WrapItem key={dish.id}>
          <DishCard dish={dish} />
        </WrapItem>
      ))}
    </Wrap>
  ) : (
    <Text>Non ci sono piatti in questo menu</Text>
  );

const RistorantePage = ({ risto, menus }) => {
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
          <TabList>
            {Object.values(TipologiaMenu).map((tipologia) => (
              <Tab key={tipologia}>{tipologia}</Tab>
            ))}
          </TabList>

          <TabPanels>
            {Object.values(TipologiaMenu).map((tipologia) => (
              <TabPanel key={tipologia}>
                <DishList
                  menu={menus.find((menu) => menu.tipologia === tipologia)}
                />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </VStack>
    </Center>
  );
};

export default function Ristorante() {
  // TODO: Da fetchare dalle APIs
  const piatto = {
    id: "1",
    nome: "Pasta alla carbonara",
    prezzo: 6,
    image: "/carbonara.jpg",
    allergeni: [Allergene.UOVA_E_DERIVATI, Allergene.LATTE_E_DERIVATI],
    isDisponibile: true,
  };
  const piatto2 = {
    id: "2",
    nome: "Bistecca",
    prezzo: 666,
    image: "/visa.png",
    allergeni: [Allergene.GLUTINE, Allergene.PESCE],
    isDisponibile: false,
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
  const menus = [
    {
      tipologia: TipologiaMenu.PRIMI,
      piatti: [piatto, piatto, piatto],
    },
    {
      tipologia: TipologiaMenu.SECONDI,
      piatti: [piatto2, piatto2, piatto2],
    },
  ];

  return (
    <Layout>
      <RistorantePage risto={ristorante} menus={menus} />
    </Layout>
  );
}
