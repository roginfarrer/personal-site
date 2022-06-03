import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  let postDirectories = fs.readdirSync(postsDirectory);
  postDirectories = postDirectories.filter((x) => {
    return fs.lstatSync(path.join(postsDirectory, x)).isDirectory();
  });
  const allPostsData = postDirectories
    .map((postDirectory) => {
      const fileName = fs
        .readdirSync(path.join(postsDirectory, postDirectory))
        .find((file) => file.endsWith(".md"));

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, postDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const frontmatter = matter(fileContents);

      // Combine the data with the id
      return {
        ...(frontmatter.data as {
          date: string;
          title: string;
          slug: string;
          draft?: boolean;
        }),
        content: frontmatter.content,
        formattedDate: getFormattedDate(frontmatter.data.date),
      };
    })
    .filter(Boolean);

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const posts = getSortedPostsData();
  return posts.map(({ slug }) => {
    return {
      params: {
        slug,
      },
    };
  });
}

export async function getPostData(slug: string) {
  const { content, ...frontmatter } = getSortedPostsData().find((_post) => {
    return _post.slug === slug;
  });

  // Combine the data with the id and contentHtml
  return {
    ...frontmatter,
    content,
    slug,
  };
}

// Get day in format: Month day, Year. e.g. April 19, 2020
function getFormattedDate(date: string) {
  const _date = new Date(date);
  const formattedDate = _date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
}
