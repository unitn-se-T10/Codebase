import { mode } from "@chakra-ui/theme-tools";
import type { ComponentStyleConfig } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const Accordion: ComponentStyleConfig = {
  baseStyle: (props: StyleFunctionProps) => ({
    button: {
      boxShadow: mode("md", "md-dark")(props),
      rounded: "lg",
      bg: mode("blackAlpha.100", "whiteAlpha.100")(props),
      _expanded: {
        bg: mode("blackAlpha.300", "whiteAlpha.300")(props),
      },
      _hover: {
        bg: mode("blackAlpha.200", "whiteAlpha.200")(props),
      },
    },
  }),
};

export default Accordion;
