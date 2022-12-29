import Layout from "components/layout";
import {
  Text,
  Box,
  VStack,
  StackDivider,
  Center,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import useSWR from "swr";
import { RestaurantPreferitiCard } from "components/restaurant";

export default function Home() {
  // TODO: cambiare l'API
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

          <Flex mt={10} ml={64} align="center" direction="column" w="70%">
            <VStack
              align="self-start"
              w="70%"
              p={10}
              shadow="1px 1px 5px 1px gray"
              bgColor="white"
              divider={<StackDivider borderColor="gray.200" />}
              rounded={20}
              spacing={5}
            >
              <Text
                color="black"
                fontSize={20}
                fontWeight="bold"
                textAlign="center"
              >
                I miei Preferiti
              </Text>
              {thumbnails ? (
                thumbnails.map((thumbnail) => (
                  <RestaurantPreferitiCard key={thumbnail.id} thumbnail={thumbnail} />
                ))
              ) : (
                <Spinner />
              )}
            </VStack>
          </Flex>
      </Layout>
    </Box>
  );
}
