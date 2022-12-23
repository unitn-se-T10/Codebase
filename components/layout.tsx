import { Box, theme, useColorModeValue } from "@chakra-ui/react";
import Footer from "components/footer";
import Navbar from "components/navbar";
import Head from "next/head";
// import type { UserHook } from "lib/hooks";

const Layout: React.FC<{
  children: React.ReactNode;
  showFooter?: boolean;
  showHeader?: boolean;
}> = ({ children, showFooter = true, showHeader = true }) => {
  return (
    <Box minH="100vh">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="theme-color"
          content={useColorModeValue(
            theme.colors.yellow[300],
            theme.colors.yellow[500]
          )}
        />
      </Head>
      {showHeader ? <Navbar /> : null}
      <Box>{children}</Box>
      {showFooter ? <Footer /> : null}
    </Box>
  );
};

export default Layout;
