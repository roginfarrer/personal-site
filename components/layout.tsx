import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "layout/Header";
import { Box } from "./Box";

export const siteTitle = "Rogin Farrer";

export default function Layout({
  children,
  customMeta,
}: {
  children: React.ReactNode;
  customMeta?: any;
}) {
  const router = useRouter();

  const meta = {
    title: "Rogin Farrer – Developer",
    description: `Front-end developer, JavaScript enthusiast, and design system nut.`,
    type: "website",
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <link rel="canonical" href={`https://rogin.xyz${router.asPath}`} />
        <meta name="twitter:card" content="summary_large_image" />;
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Lee Robinson" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@roginfarrer" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        {meta.image && (
          <>
            <meta property="og:image" content={meta.image} />
            <meta name="twitter:image" content={meta.image} />
          </>
        )}
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <Box
        maxWidth="800px"
        mx="auto"
        mt="$5"
        mb="$7"
        display="flex"
        alignItems="center"
        px="$5"
      >
        <Box ml="-0.7rem" width="100%">
          <Header />
        </Box>
      </Box>
      <Box maxWidth="800px" m="0 auto" px="$5" mb="$8">
        <main>{children}</main>
      </Box>
    </>
  );
}
