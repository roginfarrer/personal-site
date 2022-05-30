import { request } from "@octokit/request";
import { useEffect, useState } from "react";

export function useRepoData({ owner, repo }) {
  const [data, setState] = useState<
    { stars: number; description: string } | undefined
  >();

  useEffect(() => {
    setState({ stars: 123, description: "placeholder" });
    // request(`GET /repos/${owner}/${repo}`, {
    //   owner,
    //   repo,
    // }).then((response) => {
    //   if (response.data) {
    //     setState({
    //       stars: response.data.stargazers_count,
    //       description: response.data.description,
    //     });
    //   }
    // });
  }, [owner, repo]);

  return data;
}
