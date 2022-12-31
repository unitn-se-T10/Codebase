import Layout from "components/layout";
import React, { useState } from "react";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  DeleteIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  Text,
  Spacer,
  Box,
  Stack,
  Image,
  Heading,
  Input,
  Button,
  VStack,
  HStack,
  Center,
  Container,
  StackDivider,
  Avatar,
  Divider,
  FormControl,
  FormLabel,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { IconContext } from "react-icons/lib";
import { SlPaypal } from "react-icons/sl";
import { RiVisaFill } from "react-icons/ri";
import { FaCcMastercard } from "react-icons/fa";
import { SiAmericanexpress } from "react-icons/si";

const piatto = {
  image: "/carbonara.jpg",
  nome: "Pasta alla carbonara",
  quantita: 3,
  prezzo: 6,
  extra: "Senza uova, senza pancetta",
};

const carrello = [piatto, piatto, piatto];

const Copertina = ({ dish, id, setPietanze, pietanze }) => {
  const [quantita, setQuantita] = useState(dish.quantita);
  const [prezzo, setPrezzo] = useState(dish.prezzo);

  return (
    <Box w={750} shadow="0px 0px 2px 1px gainsboro" rounded={20}>
      <Flex p={5}>
        <Image
          maxW={{ base: "20%", sm: "150px" }}
          objectFit="cover"
          alt={dish.nome}
          rounded={10}
          src={dish.image}
        />
        <Spacer />

        <Center>
          <VStack alignItems="center" p={2} spacing={-1}>
            <Heading size="md">{dish.nome}</Heading>
            <Text py="2">{dish.extra}</Text>
          </VStack>
        </Center>

        <Spacer />

        <Center>
          <HStack>
            <Text mt={2} fontSize={30}>
              {quantita}
            </Text>
            <VStack spacing={1}>
              <Button
                _hover={{ bgColor: "transparent" }}
                _active={{ bgColor: "transparent" }}
                bgColor="transparent"
                size="xs"
              >
                <TriangleUpIcon
                  color="black"
                  onClick={function () {
                    setPrezzo(prezzo);
                    setQuantita(quantita + 1);
                  }}
                />
              </Button>
              <Button
                _hover={{ bgColor: "transparent" }}
                _active={{ bgColor: "transparent" }}
                bgColor="transparent"
                size="xs"
              >
                <TriangleDownIcon
                  color="black"
                  onClick={function () {
                    setPrezzo(prezzo);
                    setQuantita(Math.max(1, quantita - 1));
                  }}
                />
              </Button>
            </VStack>
          </HStack>
        </Center>

        <Spacer />

        <Center>
          <Text mt={2} fontSize={30}>
            {prezzo * quantita}€
          </Text>
        </Center>

        <Spacer />

        <Center>
          <Button
            _hover={{ bgColor: "transparent" }}
            _active={{ bgColor: "gainsboro" }}
            bgColor="transparent"
          >
            <DeleteIcon
              color="red.600"
              boxSize={7}
              onClick={() => setPietanze(pietanze.filter((_, i) => id !== i))}
            />
          </Button>
        </Center>
      </Flex>
    </Box>
  );
};

const TipoPagamento = () => {
  const paymentMethods = {
    mastercard: (
      <IconContext.Provider value={{ color: "white", size: "50px" }}>
        <FaCcMastercard />
      </IconContext.Provider>
    ),
    visa: (
      <IconContext.Provider value={{ color: "white", size: "50px" }}>
        <RiVisaFill />
      </IconContext.Provider>
    ),
    paypal: (
      <IconContext.Provider value={{ color: "white", size: "40px" }}>
        <SlPaypal />
      </IconContext.Provider>
    ),
    americanexpress: (
      <IconContext.Provider value={{ color: "white", size: "40px" }}>
        <SiAmericanexpress />
      </IconContext.Provider>
    ),
  };

  return (
    <Flex justify="space-around">
      {Object.entries(paymentMethods).map(([key, value]) => (
        <IconButton
          key={key}
          w={20}
          h={12}
          bgColor="#7376DA"
          icon={value}
          size="lg"
        />
      ))}
    </Flex>
  );
};

const NormalText = ({ children }) => {
  return (
    <Text color="white" fontFamily="Arial" fontSize={18}>
      {children}
    </Text>
  );
};

const Pagamento = ({ total }) => {
  const subTotale = total;
  const sconto = 0;
  const totale = subTotale - sconto;

  return (
    <Container shadow="md" bgColor="#565ABB" rounded={20}>
      <VStack alignItems="left" p={5}>
        <Flex>
          <Text as="b" color="white" fontFamily="Arial" fontSize={30}>
            Dettagli Carta
          </Text>
          <Spacer />
          <Avatar
            size="lg"
            src="https://avatars.dicebear.com/api/male/username.svg"
          />
        </Flex>
        <StackDivider />
        <NormalText>Tipologia Carta</NormalText>
        <TipoPagamento />

        <FormControl>
          <FormLabel color="white" fontFamily="Arial" fontSize={18}>
            Nome sulla carta
          </FormLabel>
          <Input
            color="gainsboro"
            _placeholder={{ color: "gainsboro" }}
            bgColor="#7376DA"
            placeholder="Nome Cognome"
            type="text"
          />
        </FormControl>

        <FormControl>
          <FormLabel color="white" fontFamily="Arial" fontSize={18}>
            Numero Carta
          </FormLabel>
          <Input
            color="gainsboro"
            _placeholder={{ color: "gainsboro" }}
            bgColor="#7376DA"
            inputmode="numeric"
            maxlength="16"
            placeholder="1111 2222 3333 4444"
            type="tel"
          />
        </FormControl>

        <HStack sapcing={5}>
          <FormControl>
            <FormLabel color="white" fontFamily="Arial" fontSize={18}>
              Data di scadenza
            </FormLabel>
            <Input
              color="gainsboro"
              _placeholder={{ color: "gainsboro" }}
              bgColor="#7376DA"
              placeholder="mm/yy"
              type="text"
            />
          </FormControl>

          <FormControl>
            <FormLabel color="white" fontFamily="Arial" fontSize={18}>
              CVV
            </FormLabel>
            <Input
              color="gainsboro"
              _placeholder={{ color: "gainsboro" }}
              bgColor="#7376DA"
              maxlength="3"
              placeholder="123"
              type="tel"
            />
          </FormControl>
        </HStack>
        <Divider borderColor="#565ABB" />
        <Divider borderColor="#7376DA" />

        <Flex>
          {
            // FIXME: Fetchare le API per il totale
          }
          <NormalText>Subtotal</NormalText>
          <Spacer />
          <NormalText>{subTotale}€</NormalText>
        </Flex>

        <Flex>
          {
            // FIXME: Fetchare le API per il totale
          }
          <NormalText>Sconto</NormalText>
          <Spacer />
          <NormalText>{sconto}€</NormalText>
        </Flex>

        <Flex>
          {
            // FIXME: Fetchare le API per il totale
          }
          <NormalText>Totale</NormalText>
          <Spacer />
          <NormalText>{totale}€</NormalText>
        </Flex>

        <Divider borderColor="#565ABB" />
        <Divider borderColor="#7376DA" />
        <Divider borderColor="#565ABB" />

        <Button
          w="full"
          h={57}
          bgColor="#4DE1C1"
          rightIcon={<ArrowForwardIcon />}
        >
          <Flex w="full">
            {
              // FIXME: Fetchare le API per il totale
            }
            <NormalText>{totale}€</NormalText>
            <Spacer />
            <NormalText>Checkout</NormalText>
          </Flex>
        </Button>
      </VStack>
    </Container>
  );
};

const CarrelloPage = () => {
  const [pietanze, setPietanze] = useState(carrello);
  const tot = pietanze.reduce(
    (acc, curr) => acc + curr.prezzo * curr.quantita,
    0
  );
  return (
    <Stack
      alignItems="center"
      direction={{ base: "column", lg: "row" }}
      w="95%"
      p={10}
    >
      <VStack alignItems="left" p={5} bgColor="white" rounded={20} spacing={3}>
        <HStack>
          <Link href="/ristorante/ce4b9005-bbcf-4451-a435-46d2cfa9307b">
            <Button
              _hover={{ color: "transparent" }}
              _active={{ color: "transparent" }}
              bgColor={"white"}
            >
              <ArrowBackIcon
                boxSize={5}
                color="black"
                _hover={{ color: "gray" }}
              />
            </Button>
          </Link>
          <Text as="b" fontSize={18} fontStyle="Arial">
            Torna al ristorante
          </Text>
        </HStack>

        <Divider borderColor="gray.300" />
        <Divider borderColor="white" />
        {
          // FIXME: Aggiungere i piatti in base all'ordine del carrello API
        }
        <VStack alignItems="left" spacing={-1}>
          <Text fontSize={18} fontWeight="semibold" fontStyle="Arial">
            Carrello
          </Text>
          <Text fontSize={14} fontStyle="Arial">
            Hai {pietanze.length} elementi nel carrello
          </Text>
        </VStack>
        <Divider borderColor="white" />
        {pietanze.map((pietanzaId, i) => (
          //setTotale(totale + piatto.prezzo * piatto.quantita),
          <Copertina
            dish={piatto}
            pietanze={pietanze}
            key={pietanzaId}
            id={i}
            setPietanze={setPietanze}
          />
        ))}
      </VStack>
      <Spacer />
      <Pagamento total={tot} />
    </Stack>
  );
};

export default function Ristorante() {
  return (
    <Box
      bgImage="/sfondo2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout>
        <CarrelloPage />
      </Layout>
    </Box>
  );
}
