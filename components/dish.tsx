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
    [Allergene.ARACHIDI_E_DERIVATI]: <GiPeanut size="3.5rem" />,
    [Allergene.FRUTTA_A_GUSCIO]: "",
    [Allergene.LATTE_E_DERIVATI]: <GiMilkCarton size="3.5rem" />,
    [Allergene.MOLLUSCHI]: <GiSwirledShell size="3.5rem" />,
    [Allergene.PESCE]: <GiFriedFish size="3.5rem" />,
    [Allergene.SESAMO]: <GiSesame size="3.5rem" />,
    [Allergene.SOIA]: "", // TODO: find icon
    [Allergene.CROSTACEI]: <GiSadCrab size="3.5rem" />,
    [Allergene.GLUTINE]: <GiWheat size="3.5rem" />,
    [Allergene.LUPINI]: "", // TODO: find icon
    [Allergene.SENAPE]: "", // TODO: find icon
    [Allergene.SEDANO]: "", // TODO: find icon
    [Allergene.ANIDRIDE_SOLFOROSA_E_SOLFITI]: "", // TODO: find icon
    [Allergene.UOVA_E_DERIVATI]: <GiBigEgg size="3.5rem" />,
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
    borderRadius={50}
    shadow="lg"
    bgColor={dish.isDisponibile ? "yellow.200" : "gray.300"}
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
      <Box w={70} h={70} fontSize={20} borderRadius={50} bgColor="green.300">
        <Flex align="center" direction="column" h="70%">
          <Spacer />
          {dish.prezzo} €
        </Flex>
      </Box>
    </Flex>
  </Box>
);
