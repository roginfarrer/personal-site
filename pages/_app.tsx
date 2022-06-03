import { AppProps } from "next/app";
import "../global.css";
import "../public/styles/style.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { darkTheme, lightTheme } from "../vars.css";
import { useDarkMode } from "usehooks-ts";
import { useEffect } from "react";
import Script from "next/script";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    document.documentElement.className = isDarkMode ? darkTheme : lightTheme;
  }, [isDarkMode]);

  return (
    <>
      <Script src="/theme.js" strategy="beforeInteractive" />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  );
}
