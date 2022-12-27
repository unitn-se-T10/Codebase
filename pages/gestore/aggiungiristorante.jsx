import Layout from "components/layout";
import { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TipologiaRistorante } from "lib/typings";
import {
  VStack,
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  FormControl,
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
  StackDivider,
  Button,
  Spacer,
  InputLeftAddon,
  Accordion,
  AccordionItem,
  NumberInput,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
} from "@chakra-ui/react";

const LabelForm = ({ label, type, placeholder, width }) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input w={width} mt={-2} placeholder={placeholder} type={type} />
    </FormControl>
  );
};

const Number = () => {
  return (
    <NumberInput
      allowMouseWheel
      keepWithinRange={true}
      max={24}
      min={0}
      placeholder="XX:XX"
      precision={2}
      size="sm"
    >
      <NumberInputField />
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
    <AccordionItem>
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
    <Accordion allowToggle>
      <Flex>
        <Day text="LUN" />
        <Spacer />
        <Day text="MAR" />
        <Spacer />
        <Day text="MER" />
        <Spacer />
        <Day text="GIO" />
        <Spacer />
        <Day text="VEN" />
        <Spacer />
        <Day text="SAB" />
        <Spacer />
        <Day text="DOM" />
      </Flex>
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
    <Flex>
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
        >
          {tipologia} <ChevronDownIcon />{" "}
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

const AddRistorante = () => {
  return (
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
      <LabelForm
        label={"Nome del ristorante"}
        type="text"
        width={"100%"}
        placeholder="Inserire il nome del ristorante"
      />
      <Spacer />
      <VStack alignItems="left" spacing={-1}>
        <FormLabel>Tipologia Ristorante</FormLabel>
        <Spacer />
        <TipoRistorante />
      </VStack>
      <Spacer />
      <Flex direction="row-reverse">
        <LabelForm
          label={"Indirizzo"}
          type="text"
          width={"100%"}
          placeholder="Inserire l'indirizzo"
        />
        <Spacer />
        <LabelForm width={"30%"} label={"N°"} type="number" placeholder="" />
      </Flex>
      <Spacer />
      <Flex direction="row-reverse">
        <LabelForm
          label={"Comune"}
          width="100%"
          type="text"
          placeholder="Inserire il nome del comune"
        />
        <Spacer />
        <LabelForm label="Provincia" width="30%" type="text" placeholder="" />
      </Flex>
      <Spacer />
      <VStack alignItems="left" spacing={-1}>
        <FormLabel>Numero di telefono</FormLabel>
        <InputGroup>
          <InputLeftAddon
            mt={-2}
            color="white"
            fontWeight="bold"
            bgColor="tomato"
          >
            +39
          </InputLeftAddon>
          <Input mt={-2} placeholder="Numero di telefono" type="tel" />
        </InputGroup>
      </VStack>
      <Spacer />
      <LabelForm
        label="Email"
        width="100%"
        type="email"
        placeholder="youremail@host.tld"
      />
      <Spacer />
      <VStack alignItems="left" spacing={-1}>
        <Text textAlign="left">Giorni di apertura</Text>
        <Days />
      </VStack>
      <Spacer />
      <Box w="full" h={100} p={6} borderWidth="10px">
        Spazio per il caricamento della immagine
      </Box>
      <Spacer />
      <HStack justify="center" spacing={10}>
        <Button bgColor="tomato">Applica modifiche</Button>
        <Button _hover={{ bgColor: "black" }} bgColor="gray.500">
          Annulla
        </Button>
      </HStack>
    </Flex>
  );
};

export default function Home() {
  return (
    <Box
      bgImage="/sfondo2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout>
        <VStack alignItems="center" p={20}>
          <AddRistorante />
        </VStack>
      </Layout>
    </Box>
  );
}
