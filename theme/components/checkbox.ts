import { mode } from "@chakra-ui/theme-tools";
import type { ComponentStyleConfig } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const Checkbox: ComponentStyleConfig = {
  baseStyle: (props: StyleFunctionProps) => ({
    control: {
      borderColor: mode("blackAlpha.200", "whiteAlpha.200")(props),
    },
  }),
};

export default Checkbox;
