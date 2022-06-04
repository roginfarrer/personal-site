import { StarFilledIcon } from "@radix-ui/react-icons";
import { Box } from "components/Box";
import Layout, { siteTitle } from "components/layout";
import Link, { LinkProps } from "components/Link";
import fetcher from "lib/fetcher";
import { Github } from "lib/types";
import Head from "next/head";
import useSWR from "swr";
import { vars } from "../vars.css";

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
          <CollapseCard />
          <RainbowSprinklesCard />
          <SystemPropsCard />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-evenly"
        mt="$9"
        flexDirection={{ _: "column", sm: "row" }}
      >
        <BottomLink href="https://github.com/roginfarrer">Github</BottomLink>
        <BottomLink href="https://github.com/roginfarrer/dotfiles">
          Dotfiles
        </BottomLink>
        <BottomLink href="https://twitter.com/roginfarrer">Twitter</BottomLink>
        <BottomLink href="https://www.linkedin.com/in/roginfarrer/">
          LinkedIn
        </BottomLink>
      </Box>
    </Layout>
  );
}

function RainbowSprinklesCard() {
  const { data } = useSWR<Github>(
    "/api/github?owner=wayfair&repo=rainbow-sprinkles",
    fetcher
  );

  return (
    <PostCard
      href="https://github.com/wayfair/rainbow-sprinkles"
      title="Rainbow Sprinkles"
      desc="Dynamic, theme-driven style props for Vanilla Extract."
      stars={data?.stars}
    />
  );
}
function CollapseCard() {
  const { data } = useSWR<Github>(
    "/api/github?owner=roginfarrer&repo=react-collapsed",
    fetcher
  );
  return (
    <PostCard
      href="https://github.com/roginfarrer/react-collapsed"
      title="react-collapsed"
      desc="React custom hook for creating animated and accessible expand/collapse components"
      stars={data?.stars}
    />
  );
}
function SystemPropsCard() {
  const { data } = useSWR<Github>(
    "/api/github?owner=roginfarrer&repo=system-props",
    fetcher
  );
  return (
    <PostCard
      href="https://github.com/system-props/system-props"
      title="System Props"
      desc="Responsive, theme-based, and typed style props for React."
      stars={data?.stars}
    />
  );
}
function PostCard({ title, href, desc, stars }) {
  return (
    <Link
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
        <Box as="span" display="flex" alignItems="center" gap="$2" mt="$4">
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
