import { AppProps } from "next/app";
import "../public/styles/style.css";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
