import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { owner, repo },
  } = req;

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
  const data = await response.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );

  return res.status(200).json({
    description: data.description,
    stars: data.stargazers_count,
  });
}
