import {
  VStack,
  Box,
  HStack,
  Text,
  Divider,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import {
  GiBigEgg,
  GiFriedFish,
  GiMilkCarton,
  GiPeanut,
  GiSadCrab,
  GiSesame,
  GiSwirledShell,
  GiWheat,
} from "react-icons/gi";
import { Allergene } from "lib/typings";

export const AllergeneIcon = ({ allergene }: { allergene: Allergene }) => {
  const icons = {
    [Allergene.ARACHIDI_E_DERIVATI]: <GiPeanut size="2.25rem" />,
    [Allergene.FRUTTA_A_GUSCIO]: "",
    [Allergene.LATTE_E_DERIVATI]: <GiMilkCarton size="2.25rem" />,
    [Allergene.MOLLUSCHI]: <GiSwirledShell size="2.25rem" />,
    [Allergene.PESCE]: <GiFriedFish size="2.25rem" />,
    [Allergene.SESAMO]: <GiSesame size="2.25rem" />,
    [Allergene.SOIA]: "", // TODO: find icon
    [Allergene.CROSTACEI]: <GiSadCrab size="2.25rem" />,
    [Allergene.GLUTINE]: <GiWheat size="2.25rem" />,
    [Allergene.LUPINI]: "", // TODO: find icon
    [Allergene.SENAPE]: "", // TODO: find icon
    [Allergene.SEDANO]: "", // TODO: find icon
    [Allergene.ANIDRIDE_SOLFOROSA_E_SOLFITI]: "", // TODO: find icon
    [Allergene.UOVA_E_DERIVATI]: <GiBigEgg size="2.25rem" />,
  };

  return (
    <VStack>
      {icons[allergene]}
      <Text fontSize={10}>{allergene}</Text>
    </VStack>
  );
};

export const DishCard = ({ dish }) => (
  <Box
    w={400}
    p={5}
    opacity={dish.isDisponibile ? "1" : "0.3"}
    borderRadius={50}
    shadow="0px 0px 5px 0px gainsboro"
    bgColor={dish.isDisponibile ? "white" : "gray.300"}
  >
    <Flex>
      <Box
        w={100}
        h={100}
        bgImage={dish.image}
        bgSize="cover"
        bgPosition="center"
        bgRepeat="no-repeat"
        borderRadius={50}
      ></Box>
      <Spacer />
      <VStack>
        <Text>{dish.nome}</Text>
        <Divider borderColor="black" />
        <HStack>
          {dish.allergeni.map((allergene: Allergene) => (
            <AllergeneIcon key={allergene} allergene={allergene} />
          ))}
        </HStack>
      </VStack>
      <Spacer />
      <Box
        w={70}
        h={70}
        fontSize={20}
        borderWidth="1px"
        borderColor="orange.300"
        borderRadius={50}
      >
        <Flex align="center" direction="column" h="70%">
          <Spacer />
          {dish.prezzo} €
        </Flex>
      </Box>
    </Flex>
  </Box>
);
