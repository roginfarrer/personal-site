import { StarFilledIcon } from "@radix-ui/react-icons";
import fetcher from "lib/fetcher";
import { Github } from "lib/types";
import useSWR from "swr";
import { vars } from "vars.css";
import { Box } from "./Box";
import Link from "./Link";

export function ProjectCard({ title, href, desc, repo }) {
  const [owner, project] = repo.split("/");
  const { data } = useSWR<Github>(
    `/api/github?owner=${owner}&repo=${project}`,
    fetcher
  );
  return (
    <Link
      href={href}
      border={`2px solid ${vars.colors.gray9}`}
      height={{ _: "250px", md: "275px" }}
      p="$4"
      borderRadius="$base"
      transition=".2s border-color ease, .2s transform ease"
      transform={{ hover: "rotate(-4deg) scale(1.05)" }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <span>
        <Box as="span" display="block" type="$xl" fontWeight="$bold" mb="$4">
          {title}
        </Box>
        <Box as="span" type="$md" display="block" fontStyle="italic">
          {desc}
        </Box>
      </span>
      {data?.stars && (
        <Box as="span" display="flex" alignItems="center" gap="$2" mt="$4">
          <StarFilledIcon />
          {data.stars}
        </Box>
      )}
    </Link>
  );
}
