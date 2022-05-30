import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";

import { Box } from "../components/Box";
import Link, { LinkProps } from "../components/Link";
import { vars } from "../vars.css";
import { useRepoData } from "../hooks/useRepo";
import { StarFilledIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Box
        display="grid"
        gap="$3"
        gridTemplateColumns={{ sm: "1fr fr" }}
        gridTemplateRows={{ sm: "1fr 1fr" }}
        gridTemplateAreas={{
          _: "'pic pic' 'bio bio'",
          sm: "'bio pic' 'bio pic'",
        }}
        alignItems="center"
        mb="$9"
      >
        <Box gridArea="bio" textAlign={{ _: "center", md: "left" }}>
          <Box as="h1" type="$4xl" fontWeight="bold" gridArea="name" mb="$2">
            Rogin Farrer
          </Box>
          <Box as="h2" type="$lg" mb="$3">
            Staff Engineer at{" "}
            <Box as="span" fontWeight="bold">
              Wayfair
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <Box as="p">
              Architecting design systems and UI tooling. Designing great
              developer experiences to facilitate great user experiences.
            </Box>
          </Box>
        </Box>
        <Box
          gridArea="pic"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            overflow="hidden"
            width="clamp(150px, 100%, 200px)"
            clipPath="polygon(25% 2%,101% 15%,88% 86%,32% 95%,2% 67%)"
          >
            <Box
              as="img"
              alt="Rogin drinking coffee"
              src="/images/avatar-cropped.jpg"
            />
          </Box>
        </Box>
      </Box>
      <Box as="section" mb="$9">
        <Box as="h2" type="$3xl" fontWeight="bold" mb="$6">
          Featured Projects
        </Box>
        <Box
          display="grid"
          gap="$8"
          gridTemplateColumns={{ sm: "1fr 1fr 1fr" }}
        >
          <RainbowSprinklesCard />
          <CollapseCard />
          <SystemPropsCard />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-evenly"
        mt="$9"
        flexDirection={{ _: "column", sm: "row" }}
      >
        <BottomLink external href="https://github.com/roginfarrer">
          Github
        </BottomLink>
        <BottomLink external href="https://github.com/roginfarrer/dotfiles">
          Dotfiles
        </BottomLink>
        <BottomLink external href="https://twitter.com/roginfarrer">
          Twitter
        </BottomLink>
        <BottomLink external href="https://linkedin.com/roginfarrer">
          LinkedIn
        </BottomLink>
      </Box>
    </Layout>
  );
}

function RainbowSprinklesCard() {
  const data = useRepoData({ owner: "wayfair", repo: "rainbow-sprinkles" });
  return (
    <PostCard
      href="https://github.com/wayfair/rainbow-sprinkles"
      title="Rainbow Sprinkles"
      desc={data?.description}
      stars={data?.stars}
    />
  );
}
function CollapseCard() {
  const data = useRepoData({ owner: "roginfarrer", repo: "react-collapsed" });
  return (
    <PostCard
      href="https://github.com/roginfarrer/react-collapsed"
      title="react-collapsed"
      desc={data?.description}
      stars={data?.stars}
    />
  );
}
function SystemPropsCard() {
  const data = useRepoData({ owner: "system-props", repo: "system-props" });
  return (
    <PostCard
      href="https://github.com/system-props/system-props"
      title="System Props"
      desc={data?.description}
      stars={data?.stars}
    />
  );
}
function PostCard({ title, href, desc, stars }) {
  return (
    <Link
      external
      href={href}
      border={`2px solid ${vars.colors.gray9}`}
      height={{ md: "250px" }}
      p="$4"
      borderRadius="$base"
      transition=".2s border-color ease, .2s transform ease"
      transform={{ hover: "rotate(-4deg) scale(1.05)" }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <span>
        <Box as="span" display="block" type="$xl" fontWeight="bold" mb="$4">
          {title}
        </Box>
        {desc && (
          <Box as="span" type="$md" display="block" fontStyle="italic">
            {desc}
          </Box>
        )}
      </span>
      {stars && (
        <Box as="span" display="flex" alignItems="center" gap="$2">
          <StarFilledIcon />
          {stars}
        </Box>
      )}
    </Link>
  );
}

function BottomLink(props: LinkProps) {
  return (
    <Link
      external
      color={{ _: "$gray11", hover: "$gray12" }}
      transition=".2s color ease"
      p="$3"
      borderRadius="$md"
      width={{ _: "100%", sm: "auto" }}
      textAlign="center"
      {...props}
    />
  );
}
