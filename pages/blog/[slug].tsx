import { Box } from "components/Box";
import Layout from "components/layout";
import Link from "components/Link";
import MarkdownWrapper from "components/MarkdownWrapper";
import { getAllPostSlugs, getPostData } from "lib/posts";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

export default function Post({
  postData,
}: {
  postData: {
    title: string;
    formattedDate: string;
    content: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Box mx="auto" maxWidth="38em">
        <Box
          as="article"
          display="flex"
          flexDirection="column"
          gap="$5"
          fontSize="17px"
        >
          <Box
            as="h1"
            textAlign="center"
            type={{ _: "$3xl", md: "$5xl" }}
            fontWeight="bold"
          >
            {postData.title}
          </Box>
          <Box
            color="grays.1"
            as="time"
            textAlign="center"
            display="block"
            mb="$9"
            type={{ _: "$sm", md: "$base" }}
          >
            {postData.formattedDate}
          </Box>
          <MarkdownWrapper content={postData.content} />

          <Link
            href="/"
            color="white"
            textDecoration="none"
            bg="$blue9"
            borderRadius="$base"
            textAlign="center"
            display="block"
            py="$3"
            mb="$9"
          >
            <span aria-hidden="true">👈</span>&nbsp;&nbsp; Back
          </Link>
        </Box>
      </Box>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.slug as string);
  return {
    props: {
      postData,
    },
  };
};
