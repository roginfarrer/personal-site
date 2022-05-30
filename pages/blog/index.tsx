import { GetStaticProps } from "next";
import { Box } from "../../components/Box";
import { getSortedPostsData } from "../../lib/posts";
import Layout from "../../components/layout";

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
      <Box as="h2" type="$3xl" fontWeight="bold" mt="$8" mb="$4">
        Articles
      </Box>
      <ul>
        {allPostsData.map(
          ({ slug, formattedDate: date, title, draft: isDraft }) => (
            <Box as="li" key={slug}>
              <Box as="span" display="block" type="$xl" mb="$3">
                <Box as="a" color={{ hover: "$blue11" }} href={`/blog/${slug}`}>
                  {title}
                </Box>
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
                Posted on {date}
              </Box>
            </Box>
          )
        )}
      </ul>
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
