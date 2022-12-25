import Layout from "components/layout";
import {
  VStack,
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Button,
} from "@chakra-ui/react";

const RenderHome = () => {
  return (
    <Flex
      justify="center"
      px={{ base: "0", sm: "8" }}
      py={{ base: "16", md: "32" }}
    >
      <Box w={550} h={500} p={5} borderRadius={20} shadow="dark-lg">
        <VStack alignItems="center">
          <Text
            align="center"
            mt="20"
            p="6"
            textColor="white"
            fontSize={50}
            fontWeight="bold"
          >
            HUNGRY EVERYWHERE
          </Text>
          <InputGroup size="lg">
            <Input
              pr="4.5rem"
              borderRadius={20}
              placeholder="Indrizzo di consegna"
              type="type"
            />
            <InputRightElement w="9rem" p={1}>
              <Button h="1.75rem" borderRadius={20} size="sm">
                Trova Ristoranti
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
      </Box>
    </Flex>
  );
};

export default function Home() {
  return (
    <Box
      bgImage="/sfondo1.png"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout>
        <RenderHome />
      </Layout>
    </Box>
  );
}
