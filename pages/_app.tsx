import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import "../global.css";
import "../public/styles/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
