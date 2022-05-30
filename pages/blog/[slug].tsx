import Layout from "../../components/layout";
import { getAllPostSlugs, getPostData } from "../../lib/posts";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "../../components/Link";

import styled, { keyframes, css } from "styled-components";
import Box, { BoxProps } from "../../components/Box-system-props";
import Stack from "../../components/Stack";
import MarkdownWrapper from "../../components/MarkdownWrapper.js";
import { Theme } from "../../components/theme";

const colorChange = (theme: Theme) => keyframes`
  0% { color: #d14054; }
  50% { color: ${theme.colors.accent}; }
  100% { color: #d14054; }
`;

const RoginFarrer = styled(Box)<BoxProps>`
  animation: ${({ theme }) =>
    css`
      ${colorChange(theme)} 1s linear infinite
    `};
`;

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
      <Box mx="auto" maxWidth="38em" mt={3}>
        <RoginFarrer
          is="h3"
          fontSize={3}
          fontFamily="serif"
          color="grays.1"
          mb={4}
          textAlign="center"
        >
          <Link href="/" textDecoration="none" color="inherit">
            Rogin Farrer
          </Link>
        </RoginFarrer>
        <Stack is="article" gap={4}>
          <Box
            is="h1"
            textAlign="center"
            fontFamily="serif"
            fontSize={[3, , 5]}
          >
            {postData.title}
          </Box>
          <Box
            color="grays.1"
            is="time"
            fontFamily="serif"
            fontVariant="small-caps"
            textAlign="center"
            display="block"
          >
            {postData.formattedDate}
          </Box>
          <MarkdownWrapper content={postData.content} />

          <Link
            href="/"
            color="white"
            textDecoration="none"
            bg="accent"
            borderRadius="5px"
            textAlign="center"
            display="block"
            py={2}
            mb={5}
          >
            <span aria-hidden="true">👈</span>&nbsp;&nbsp; Back
          </Link>
        </Stack>
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
