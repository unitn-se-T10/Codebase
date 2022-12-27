import Layout from "components/layout";
import { useState } from "react";
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

export default function Home() {
  return (
    <Box
      bgImage="/sfondo2.jpg"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Layout></Layout>
    </Box>
  );
}
