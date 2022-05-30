import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme as globalTheme } from "./theme";
import { Box } from "./Box";
import { Header } from "../layout/Header";
import { vars } from "../vars.css";

export const siteTitle = "Rogin Farrer";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <>
      <Head>
        <link rel="icon" href="/images/bitmoji.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <ThemeProvider theme={globalTheme}>
        <Box
          maxWidth="700px"
          mx="auto"
          height={{ _: "100px" }}
          display="flex"
          alignItems="center"
          px="$5"
        >
          <Box ml="-0.7rem" width="100%">
            <Header />
          </Box>
        </Box>
        <Box maxWidth="700px" m="0 auto" px="$5">
          <main>{children}</main>
        </Box>
      </ThemeProvider>
    </>
  );
}
