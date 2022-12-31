import { useRef } from "react";
import {
  HStack,
  VStack,
  useDisclosure,
  Box,
  Text,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  Spacer,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { ChakraNextImage } from "components/utils";
import { GoLocation } from "react-icons/go";
import { FaPhoneAlt } from "react-icons/fa";
import NextLink from "next/link";
import { MdEmail } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useState } from "react";
import { RistoranteThumbnail } from "lib/typings";
import { DeleteIcon } from "@chakra-ui/icons";
import { Session } from "next-auth";

const Preferiti: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);

  return isPressed ? (
    <IconContext.Provider value={{ color: "tomato", size: "30px" }}>
      <AiFillHeart onClick={() => setIsPressed(!isPressed)} />
    </IconContext.Provider>
  ) : (
    <IconContext.Provider value={{ size: "30px" }}>
      <AiOutlineHeart onClick={() => setIsPressed(!isPressed)} />
    </IconContext.Provider>
  );
};

const PreferitiTrue: React.FC = () => {
  const [isPressed, setIsPressed] = useState(true);

  return isPressed ? (
    <IconContext.Provider value={{ color: "tomato", size: "30px" }}>
      <AiFillHeart onClick={() => setIsPressed(!isPressed)} />
    </IconContext.Provider>
  ) : (
    <IconContext.Provider value={{ size: "30px" }}>
      <AiOutlineHeart onClick={() => setIsPressed(!isPressed)} />
    </IconContext.Provider>
  );
};

export const RestaurantPreferitiCard: React.FC<{
  thumbnail: RistoranteThumbnail;
  isGestore: boolean;
}> = ({ thumbnail, isGestore = false }) => (
  <HStack alignItems="top" spacing={3}>
    <ChakraNextImage
      borderRadius={20}
      alt={thumbnail.nome}
      src={`data:image/jpg;base64,${thumbnail.immagine}`}
      width={200}
      height={200}
    />
    <VStack align="start">
      <NextLink href={`/ristorante/${thumbnail.id}`}>
        <Box h={10} fontWeight="bold" fontStyle="oblique">
          {thumbnail.nome}
        </Box>
        <HStack>
          <GoLocation width={3} height={3} />
          <Box h={5}>{thumbnail.indirizzo}</Box>
        </HStack>
        <HStack>
          <FaPhoneAlt width={3} height={3} />
          <Box h={5}>{thumbnail.telefono}</Box>
        </HStack>
        <HStack>
          <MdEmail width={3} height={3} />
          <Box h={5}>{thumbnail.email}</Box>
        </HStack>
      </NextLink>
    </VStack>

    <PreferitiTrue />
  </HStack>
);

function DeleteDialog() {
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
        onClick={onOpen}
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

export const RestaurantCard: React.FC<{
  thumbnail: RistoranteThumbnail;
  isGestore: boolean;
  session: Session;
}> = ({ thumbnail, isGestore, session }) => (
  <HStack alignItems="top" w="55rem" spacing={3}>
    <ChakraNextImage
      borderRadius={20}
      alt={thumbnail.nome}
      src={`data:image/jpg;base64,${thumbnail.immagine}`}
      width={200}
      height={200}
    />
    <VStack align="start">
      <NextLink href={`/ristorante/${thumbnail.id}`}>
        <HStack>
          <Box h={7} fontWeight="bold" fontStyle="oblique">
            {thumbnail.nome}
          </Box>
        </HStack>
        <Text color="tomato" fontWeight="bold" fontStyle="oblique">
          {thumbnail.tipologia}
        </Text>
        <HStack>
          <GoLocation width={3} height={3} />
          <Box h={5}>{thumbnail.indirizzo}</Box>
        </HStack>
        <HStack>
          <FaPhoneAlt width={3} height={3} />
          <Box h={5}>{thumbnail.telefono}</Box>
        </HStack>
        <HStack>
          <MdEmail width={3} height={3} />
          <Box h={5}>{thumbnail.email}</Box>
        </HStack>
      </NextLink>
    </VStack>
    <Spacer />
    {session?.user?.isGestore ? <DeleteDialog /> : <Preferiti />}
  </HStack>
);

export const RestaurantCard2: React.FC<{
  thumbnail: RistoranteThumbnail;
  isGestore?: boolean;
  sessione: Session;
}> = ({ thumbnail, isGestore, sessione }) => (
  <HStack alignItems="top" w="55rem" spacing={3}>
    <ChakraNextImage
      borderRadius={20}
      alt={thumbnail.nome}
      src={`data:image/jpg;base64,${thumbnail.immagine}`}
      width={200}
      height={200}
    />
    <VStack align="start">
      <NextLink href={`/ristorante/${thumbnail.id}`}>
        <HStack>
          <Box h={7} fontWeight="bold" fontStyle="oblique">
            {thumbnail.nome}
          </Box>
        </HStack>
        <Text color="tomato" fontWeight="bold" fontStyle="oblique">
          {thumbnail.tipologia}
        </Text>
        <HStack>
          <GoLocation width={3} height={3} />
          <Box h={5}>{thumbnail.indirizzo}</Box>
        </HStack>
        <HStack>
          <FaPhoneAlt width={3} height={3} />
          <Box h={5}>{thumbnail.telefono}</Box>
        </HStack>
        <HStack>
          <MdEmail width={3} height={3} />
          <Box h={5}>{thumbnail.email}</Box>
        </HStack>
      </NextLink>
    </VStack>
    <Spacer />
    {sessione?.user?.isGestore ? null : <Preferiti />}
  </HStack>
);
