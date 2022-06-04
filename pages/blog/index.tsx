import { Box } from "components/Box";
import Layout from "components/layout";
import Link from "components/Link";
import { getSortedPostsData } from "lib/posts";
import { GetServerSideProps } from "next";

export default function Page({
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
    <Layout>
      <Box as="h2" type="$5xl" fontWeight="$bold" mb="$8">
        Articles
      </Box>
      <Box as="ul" display="flex" gap="$6" flexDirection="column">
        {allPostsData.map(
          ({ slug, formattedDate: date, title, draft: isDraft }) => (
            <Box as="li" key={slug}>
              <Box as="span" display="block" type="$2xl" mb="$3">
                <Link
                  fontWeight="$bold"
                  as="a"
                  color={{ hover: "$blue11" }}
                  href={`/blog/${slug}`}
                >
                  {title}
                </Link>
                {isDraft && (
                  <Box
                    as="span"
                    ml="$2"
                    p="$2"
                    bg="accent"
                    color="white"
                    borderRadius="4px"
                  >
                    DRAFT
                  </Box>
                )}
              </Box>
              <Box as="span" display="block" fontSize="$sm">
                {date}
              </Box>
            </Box>
          )
        )}
      </Box>
      <Box
        as="button"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        width="100%"
        color="white"
        textDecoration="none"
        bg="$blue9"
        borderRadius="$base"
        textAlign="center"
        display="block"
        py="$3"
        mt="$6"
      >
        <span aria-hidden="true">👆</span>&nbsp;&nbsp;Scroll to the top
      </Box>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
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
