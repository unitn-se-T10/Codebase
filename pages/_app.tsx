import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import theme from "theme/index";

// function Auth({ children }) {
//   // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
//   const { status } = useSession({ required: true });
//
//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }
//
//   return children;
// }

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SessionProvider session={session}>
        {/* {Component.auth ? ( */}
        {/*   <Auth> */}
        {/*     <Component {...pageProps} /> */}
        {/*   </Auth> */}
        {/* ) : ( */}
        <Component {...pageProps} />
        {/* )} */}
      </SessionProvider>
    </ChakraProvider>
  );
}
