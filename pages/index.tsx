import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import Link from "../components/Link";
import { GetStaticProps } from "next";
import styled from "styled-components";

import Box from "../components/Box";
import { SiteHeaderBio } from "../components/SiteHeaderBio";

const PostTitleLink = styled(Link)`
  color: ${({ theme }) => theme.colors.grays[2]};
  text-decoration: none;
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    formattedDate: string;
    title: string;
    slug: string;
    draft: boolean;
  }[];
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Box
        display="grid"
        gridTemplateColumns={["1fr", , , , "20em 1fr"]}
        gridTemplateAreas={["'bio' 'blog'", , , , "'bio blog'"]}
        gridRowGap={[5, , , , 0]}
        gridColumnGap={[0, , , , 5]}
        maxWidth="58em"
        mx="auto"
        mt={3}
        mb={5}
      >
        <Box gridArea="bio">
          <SiteHeaderBio />
        </Box>
        <Box gridArea="blog" maxWidth="38em">
          <Box
            as="h2"
            fontSize={4}
            mb={4}
            textAlign="center"
            fontFamily="serif"
          >
            Articles
          </Box>
          <ul>
            {allPostsData.map(
              ({ slug, formattedDate: date, title, draft: isDraft }) => (
                <Box
                  as="li"
                  css={{
                    "& + &": {
                      marginTop: "3rem",
                    },
                  }}
                  key={slug}
                >
                  <Box
                    as="span"
                    display="block"
                    fontFamily="serif"
                    fontSize={2}
                    mb={2}
                  >
                    <PostTitleLink href={`/blog/${slug}`}>
                      {title}
                    </PostTitleLink>
                    {isDraft && (
                      <Box
                        as="span"
                        ml="2"
                        p={1}
                        fontFamily="sansSerif"
                        fontSize={0}
                        bg="accent"
                        color="white"
                        borderRadius="4px"
                      >
                        DRAFT
                      </Box>
                    )}
                  </Box>
                  <Box as="span" display="block" fontSize={0}>
                    Posted on {date}
                  </Box>
                </Box>
              )
            )}
          </ul>
        </Box>
      </Box>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();

  if (process.env.NODE_ENV !== "development") {
    const filteredPosts = allPostsData.filter((post) => !post.draft);
    return {
      props: {
        allPostsData: filteredPosts,
      },
    };
  }

  return {
    props: {
      allPostsData,
    },
  };
};
