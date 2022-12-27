import Layout from "components/layout";
import {
  Button,
  Text,
  Box,
  HStack,
  VStack,
  StackDivider,
  Center,
  Spinner,
} from "@chakra-ui/react";
import useSWR from "swr";
import { RestaurantCard } from "components/restaurant";
import ChakraNextLink from "components/chakraNextLink";
import { signIn, useSession } from "next-auth/react";

const GestorePage = () => {
  const fetcher = (url) =>
    fetch(url)
      .then((r) => r.json())
      .then((j) => j.ristoranti);

  const { data: thumbnails } = useSWR(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/myrestaurants`,
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
        <HStack align="top" p={10} spacing={20}>
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
            <Text fontSize={20} fontWeight="semibold">
              I miei ristoranti
            </Text>
            {thumbnails ? (
              thumbnails.map((thumbnail) => (
                <RestaurantCard
                  key={thumbnail.id}
                  thumbnail={thumbnail}
                  isGestore
                />
              ))
            ) : (
              <Spinner />
            )}
            <Box
              w={125}
              h={125}
              borderWidth="1px"
              borderColor="gray"
              borderRadius={40}
              borderBottomLeftRadius={4}
            >
              <Center>
                <ChakraNextLink href="/gestore/aggiungiristorante">
                  <Button
                    w={100}
                    h={100}
                    mt={3}
                    color="black"
                    fontSize={40}
                    _hover={{ color: "gainsboro" }}
                    bgColor="white"
                  >
                    +
                  </Button>
                </ChakraNextLink>
              </Center>
            </Box>
          </VStack>
        </HStack>
      </Layout>
    </Box>
  );
};

const UtentePage = () => (
  <Layout>
    <Text>Non sei autorizzato a visualizzare questa pagina</Text>
  </Layout>
);

export default function Home() {
  const { data: session } = useSession();

  if (session === undefined) {
    return <Spinner />;
  }

  if (session === null) {
    signIn();
  }

  return session?.user?.isGestore ? <GestorePage /> : <UtentePage />;
}