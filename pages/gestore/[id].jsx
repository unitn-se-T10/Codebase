import Layout from "components/layout";
import { useState, useRef } from "react";
import ReactDOM from "react-dom/client";
import { ChakraNextImage } from "components/utils";
import {
  Button,
  useDisclosure,
  Text,
  Box,
  HStack,
  VStack,
  StackDivider,
  Spacer,
  Flex,
  Center,
  Link,
  Spinner,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { IconContext } from "react-icons/lib";
import { GoLocation } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdFastfood } from "react-icons/md";
import { CgOptions } from "react-icons/cg";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TipologiaRistorante } from "lib/typings";
import { DeleteIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import NextLink from "next/link";

function AlertDialogExample() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      {/*<Button align="top" colorScheme="red" onClick={onOpen}>
        X
      </Button>
      */}

      <Button
        _hover={{ bgColor: "transparent" }}
        _active={{ bgColor: "gainsboro" }}
        bgColor="transparent"
      >
        <DeleteIcon color="red.600" boxSize={7} />
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Elimina ristorante
            </AlertDialogHeader>

            <AlertDialogBody>
              Sei sicuro? Non puoi annulare questa operazione successivamente.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                _hover={{ bgColor: "black" }}
                bgColor="gray.500"
                onClick={onClose}
              >
                Annulla
              </Button>
              <Button ml={3} colorScheme="red" onClick={onClose}>
                Elimina
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

const RestaurantCard = ({ thumbnail }) => (
  <Flex w="100%">
    <NextLink href={`/ristorante/${thumbnail.id}`}>
      <HStack alignItems="top" spacing={3}>
        <ChakraNextImage
          borderRadius={20}
          src={thumbnail.immagine}
          width={200}
          height={200}
        />

        <VStack align="start">
          <Box h={10} fontWeight="bold" fontStyle="oblique">
            {thumbnail.nome}
          </Box>
          <HStack>
            <GoLocation w={3} h={3} />
            <Box h={5}>{thumbnail.indirizzo}</Box>
          </HStack>
          <HStack>
            <FaPhoneAlt w={3} h={3} />
            <Box h={5}>{thumbnail.telefono}</Box>
          </HStack>
          <HStack>
            <MdEmail w={3} h={3} />
            <Box h={5}>{thumbnail.email}</Box>
          </HStack>
        </VStack>
      </HStack>
    </NextLink>
    <Spacer />
    <AlertDialogExample />
  </Flex>
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
  console.log(thumbnails);

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
                <RestaurantCard key={thumbnail.id} thumbnail={thumbnail} />
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
                <Link href="http://localhost:3000/gestore/aggiungiristorante">
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
                </Link>
              </Center>
            </Box>
          </VStack>
        </HStack>
      </Layout>
    </Box>
  );
}
