import { GetServerSideProps } from "next";
import { Box } from "../../components/Box";
import { getSortedPostsData } from "../../lib/posts";
import Layout from "../../components/layout";
import Link from "../../components/Link";

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
      <Box as="h2" type="$5xl" fontWeight="bold" mt="$8" mb="$6">
        Articles
      </Box>
      <Box as="ul" display="flex" gap="$7" flexDirection="column">
        {allPostsData.map(
          ({ slug, formattedDate: date, title, draft: isDraft }) => (
            <Box as="li" key={slug}>
              <Box as="span" display="block" type="$xl" mb="$3">
                <Link
                  fontWeight="bold"
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
