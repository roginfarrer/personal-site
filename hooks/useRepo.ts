import { request } from "@octokit/request";
import { useQuery } from "react-query";

export function useRepoData({ owner, repo }: { owner: string; repo: string }) {
  return useQuery(`${owner}/${repo}`, () =>
    request(`GET /repos/${owner}/${repo}`, {
      owner,
      repo,
    })
  );

  // useEffect(() => {
  //   setState({ stars: 123, description: "placeholder" });
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
  // }, [owner, repo]);

  // return data;
}
