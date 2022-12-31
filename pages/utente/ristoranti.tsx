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
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { URL } from "url";

export default function Home() {
  const { data: session } = useSession();
  const fetcher = (url: URL) =>
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
        <Center>
          <HStack align="top" w="60%" p={10} spacing={20}>
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
              <Text fontSize={20} fontWeight="bold">
                I miei Ristoranti
              </Text>
              {thumbnails ? (
                thumbnails.map((thumbnail) => (
                  <RestaurantCard
                    key={thumbnail.id}
                    thumbnail={thumbnail}
                    session={session}
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
                  <ChakraNextLink href="/utente/aggiungiristorante">
                    <Button
                      w={100}
                      h={100}
                      mt={3}
                      color="black"
                      fontSize={40}
                      _hover={{ color: "gainsboro" }}
                      _active={{ bgColor: "transparent" }}
                      bgColor="white"
                    >
                      +
                    </Button>
                  </ChakraNextLink>
                </Center>
              </Box>
            </VStack>
          </HStack>
        </Center>
      </Layout>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session?.user?.isGestore) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
