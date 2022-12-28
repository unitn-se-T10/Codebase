import Layout from "components/layout";
import {
  VStack,
  HStack,
  Text,
  Divider,
  Center,
  Wrap,
  WrapItem,
  Spinner,
} from "@chakra-ui/react";
import { StarIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { TipologiaMenu } from "lib/typings";
import { DishCard } from "components/dish";
import { ChakraNextImage } from "components/utils";
import useSWR from "swr";

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

const MenuTabs = ({ menus }) => {
  if (!menus) return <Spinner />;

  return (
    <TabPanels>
      {Object.values(TipologiaMenu).map((tipologia) => (
        <TabPanel key={tipologia}>
          <DishList menu={menus.find((menu) => menu.tipologia === tipologia)} />
        </TabPanel>
      ))}
    </TabPanels>
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

  return (
    <Layout>
      <Center>
        <VStack alignItems="center" p={4} spacing={4}>
          <HStack spacing={5}>
            <ChakraNextImage
              borderRadius={20}
              alt={ristorante.nome}
              src={`data:image/jpg;base64,${ristorante.immagine}`}
              width={200}
              height={200}
            />
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
              <Text>Indirizzo: {ristorante.indirizzo}</Text>
              <HStack>
                <Text>
                  Orari:
                  {
                    ristorante.orariApertura /* TODO: definire tipo di orariApertura */
                  }
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
              <Text>Telefono: {ristorante.telefono}</Text>
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
            <MenuTabs menus={menus} />
          </Tabs>
        </VStack>
      </Center>
    </Layout>
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
