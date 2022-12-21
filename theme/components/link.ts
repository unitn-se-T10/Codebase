import { theme } from "@chakra-ui/theme";
import { mode } from "@chakra-ui/theme-tools";
import type { ComponentStyleConfig } from "@chakra-ui/react";
import type { StyleFunctionProps } from "@chakra-ui/styled-system";

const buttonTheme = theme.components.Button;

const Link: ComponentStyleConfig = {
  baseStyle: {
    _hover: {
      textDecoration: "none",
    },
  },
  variants: {
    link: (props: StyleFunctionProps) => ({
      ...buttonTheme.variants.link(props),
      fontWeight: "bold",
    }),
    ghostText: (props: StyleFunctionProps) => {
      const { colorScheme: c } = props;

      return {
        _hover: {
          color: mode(`${c}.800`, `${c}.200`)(props),
        },
        _active: {
          color: mode(`${c}.500`, `${c}.700`)(props),
        },
        rounded: "md",
        fontWeight: "bold",
      };
    },
    solid: (props: StyleFunctionProps) => ({
      ...buttonTheme.variants.solid(props),
      py: 2,
      px: 3,
      rounded: "md",
      fontWeight: "bold",
    }),
  },
  sizes: {
    sm: buttonTheme.sizes.sm,
  },
};

export default Link;
