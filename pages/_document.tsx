import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="light">
        <Head>
          <link href="/fonts/IBMPlexSansVar-Italic.woff2" rel="stylesheet" />
          <link href="/fonts/IBMPlexSansVar-Roman.woff2" rel="stylesheet" />
          <meta name="robots" content="follow, index" />
          <link rel="icon" href="/images/bitmoji.ico" />
          <meta
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            name="robots"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
