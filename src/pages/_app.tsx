import "../styles/globals.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";

function MyApp({
  Component,
  pageProps
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionContextProvider>
  );
}
export default MyApp;

// TODO:
/*
strip old css / convert to Chakra
add to root container
build global headbar
make list of design ideas
pull out account/session logic to get avatar in headbar
chakra modal is fucking with focus
lookup todo vs code plugins
update account to smaller column
make this work for dev offline
look up simple react state libs (zustand?)
fix account annimation
reorg root to split marketing + app
*/
