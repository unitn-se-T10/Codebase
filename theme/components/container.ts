import { mode } from "@chakra-ui/theme-tools";
import type { ComponentStyleConfig } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const Container: ComponentStyleConfig = {
  baseStyle: {
    p: 0,
  },
  variants: {
    rounded: (props: StyleFunctionProps) => ({
      rounded: "lg",
      bg: mode("gray.100", "gray.700")(props),
      boxShadow: "2xl",
      p: 4,
    }),
    footer: (props: StyleFunctionProps) => ({
      bg: mode("gray.200", "gray.600")(props),
      maxW: "100%",
      pos: "sticky",
      top: "100vh",
    }),
  },
};

export default Container;
