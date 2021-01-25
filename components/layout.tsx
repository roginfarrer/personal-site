import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { theme as globalTheme } from "./theme";
import GlobalStyles from "../components/globalStyle";
import Box from "./Box";

export const siteTitle = "Rogin Farrer";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  home?: boolean;
}) {
  return (
    <div>
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
        <GlobalStyles />
        <Box
          px={[3, 3, 3, 5]}
          bg="white"
          transition="background-color .2s ease"
        >
          <Box color="grays.2" lineHeight="1.5" m="0 auto">
            <main>{children}</main>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}
