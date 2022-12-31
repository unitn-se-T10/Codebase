import Layout from "components/layout";
import { useState } from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TipologiaRistorante } from "lib/typings";
import {
  VStack,
  Box,
  Text,
  Flex,
  FormLabel,
  HStack,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Spacer,
  Accordion,
  AccordionItem,
  NumberInput,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { unstable_getServerSession } from "next-auth/next";
import { addRstSchema } from "lib/yupSchemas";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { FormField } from "components/authentication";
import * as Yup from "yup";
import { GetServerSideProps } from "next";

type addValues = {
  rstName: string;
  rstTypo: string;
  indirizzo: string;
  comune: string;
  provincia: string;
  telefono: string;
  email: string;
  remember: boolean;
};

let errorFromServer = null;

const Number = () => {
  return (
    <NumberInput
      allowMouseWheel
      keepWithinRange={true}
      max={24}
      min={0}
      precision={2}
      size="sm"
    >
      <NumberInputField placeholder="00.00" />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

const ChooseOrario = () => {
  return (
    <Flex direction="column">
      <Flex>
        <FormLabel>DA</FormLabel>
        <Spacer />
        <Number />
      </Flex>
      <Spacer />
      <Flex>
        <FormLabel>A</FormLabel>
        <Spacer />
        <Number />
      </Flex>
    </Flex>
  );
};

const Orario = () => {
  return (
    <Flex direction="column">
      <FormLabel>Mattina</FormLabel>
      <ChooseOrario />
      <Spacer />
      <FormLabel>Pomeriggio</FormLabel>
      <ChooseOrario />
    </Flex>
  );
};

const Day = ({ text }) => {
  return (
    <AccordionItem w="full">
      <AccordionButton _expanded={{ bg: "tomato", color: "white" }}>
        <Box as="span" flex="1" textAlign="left">
          {text}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <Orario />
      </AccordionPanel>
    </AccordionItem>
  );
};
const Days = () => {
  return (
    <Accordion allowMultiple>
      <HStack align="top" spacing={5}>
        <Day text="LUN" />
        <Day text="MAR" />
        <Day text="MER" />
        <Day text="GIO" />
        <Day text="VEN" />
        <Day text="SAB" />
        <Day text="DOM" />
      </HStack>
    </Accordion>
  );
};

const ResetButton = ({ onClick }) => (
  <Button
    p={2}
    color="white"
    borderRadius={10}
    bgColor="tomato"
    onClick={onClick}
    size="s"
  >
    Reset
  </Button>
);

const TipoRistorante = () => {
  const [tipologia, setTipologia] = useState("Tipologia");

  return (
    <Flex w="full">
      <Menu>
        <MenuButton
          w="80%"
          px={4}
          py={2}
          fontWeight="bold"
          borderWidth="1px"
          borderRadius="md"
          _hover={{ bg: "tomato" }}
          _expanded={{ bg: "tomato" }}
          transition="all 0.2s"
          bgColor={tipologia === "Tipologia" ? "white" : "tomato"}
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
      <Spacer />
      <ResetButton onClick={() => setTipologia("Tipologia")} />
    </Flex>
  );
};

export default function Home() {
  const router = useRouter();

  return (
    <Box
      bgImage="/sfondo2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout>
        <VStack alignItems="center" p={20}>
          <Flex direction="column" w="90%" p={10} bgColor="white" rounded={40}>
            <Text
              mt={-2}
              color="black"
              fontSize={40}
              fontWeight="bold"
              textAlign="center"
            >
              Inserire dati ristorante
            </Text>
            <Formik
              validationSchema={Yup.object().shape({
                rstName: addRstSchema.rstName.test(
                  "Server",
                  () => errorFromServer,
                  () => !errorFromServer
                ),

                rstTypo: addRstSchema.rstTypo.test(
                  "Server",
                  () => errorFromServer,
                  () => !errorFromServer
                ),

                indirizzo: addRstSchema.indirizzo.test(
                  "Server",
                  () => errorFromServer,
                  () => !errorFromServer
                ),

                comune: addRstSchema.comune.test(
                  "Server",
                  () => errorFromServer,
                  () => !errorFromServer
                ),

                provincia: addRstSchema.provincia.test(
                  "Server",
                  () => errorFromServer,
                  () => !errorFromServer
                ),

                telefono: addRstSchema.telefono.test(
                  "Server",
                  () => errorFromServer,
                  () => !errorFromServer
                ),

                email: addRstSchema.email.test(
                  "Server",
                  () => errorFromServer,
                  () => !errorFromServer
                ),
              })}
              initialValues={{
                rstName: "", //nome ristorante
                rstTypo: "Tipologia", //tipologia ristorante
                indirizzo: "", //indirizzo
                comune: "", //comune
                provincia: "", //provincia
                telefono: "", //telefono
                email: "", //email
                remember: false,
              }}
              onSubmit={async (values, actions) => {
                //await handleSubmit(values);
                await actions.validateForm();
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <VStack spacing={4}>
                    <HStack w="full">
                      <FormField
                        fieldName="rstName"
                        label="Nome del ristorante"
                        placeholder="Inserire nome ristorante"
                        type="text"
                      />
                      <VStack alignItems="left" w="full" spacing={0}>
                        <FormLabel>Tipologia Ristorante</FormLabel>
                        <TipoRistorante />
                      </VStack>
                    </HStack>
                    <FormField
                      fieldName="indirizzo"
                      label="Indirizzo"
                      placeholder="Inserire indirizzo"
                      type="text"
                    />
                    <HStack w="full">
                      <FormField
                        fieldName="comune"
                        label="Comune"
                        placeholder="Inserire comune"
                        type="text"
                      />
                      <FormField
                        fieldName="provincia"
                        label="Provincia"
                        placeholder="Inserire provincia"
                        type="text"
                      />
                    </HStack>
                    <FormField
                      fieldName="telefono"
                      label="Telefono"
                      placeholder="Inserire numero di telefono"
                      type="tel"
                    />
                    <FormField
                      fieldName="email"
                      label="Email"
                      placeholder="Inserire email"
                      type="email"
                    />
                    <VStack alignItems="left" w="full">
                      <Text textAlign="left">Giorni di apertura</Text>
                      <Days />
                    </VStack>
                    <FormField
                      placeholder=""
                      fieldName="image"
                      label="Immagine"
                      type="file"
                    />

                    <Spacer my={4} />
                    <HStack justify="center" spacing={10}>
                      <Button
                        bgColor="#FF3D00"
                        isLoading={props.isSubmitting}
                        type="submit"
                      >
                        Applica modifiche
                      </Button>
                      <Button
                        _hover={{ bgColor: "black" }}
                        bgColor="gray.500"
                        onClick={() => router.push("/utente/ristoranti")}
                      >
                        Annulla
                      </Button>
                    </HStack>
                  </VStack>
                </Form>
              )}
            </Formik>
          </Flex>
        </VStack>
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
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
