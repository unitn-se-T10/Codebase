import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

export type ChakraNextLinkProps = React.PropsWithChildren<
  Omit<ChakraLinkProps, "as"> & Omit<NextLinkProps, "as">
>;

const ChakraNextLink: React.FC<ChakraNextLinkProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <ChakraLink as={NextLink} href={href} {...props}>
      {children}
    </ChakraLink>
  );
};

export default ChakraNextLink;
