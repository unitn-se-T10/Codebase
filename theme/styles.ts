import { mode } from "@chakra-ui/theme-tools";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";
import type { Styles } from "@chakra-ui/theme-tools";

const styles: Styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("yellow.500", "yellow.900")(props),
      color: mode("black", "white")(props),
    },
  }),
};

export default styles;
