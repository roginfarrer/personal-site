import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import "../global.css";
import "../public/styles/style.css";
import { Open_Sans } from "next/font/google";

const opensans = Open_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider attribute="class">
        <main className={opensans.className}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </>
  );
}
