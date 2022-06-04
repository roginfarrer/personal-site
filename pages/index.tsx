import { Box } from "components/Box";
import Layout, { siteTitle } from "components/layout";
import Link, { LinkProps } from "components/Link";
import Head from "next/head";
import { ProjectCard } from "components/ProjectCard";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Box
        display="grid"
        gap="$2"
        gridTemplateColumns={{ sm: "1fr fr" }}
        gridTemplateRows={{ sm: "1fr 1fr" }}
        gridTemplateAreas={{
          _: "'pic pic' 'bio bio'",
          sm: "'bio pic' 'bio pic'",
        }}
        alignItems="center"
        mb="$8"
      >
        <Box gridArea="bio" textAlign={{ _: "center", md: "left" }}>
          <Box
            as="h1"
            type={{ _: "$4xl", sm: "$5xl" }}
            fontWeight="$bolder"
            gridArea="name"
            mb="$4"
          >
            Rogin Farrer
          </Box>
          <Box as="h2" type="$lg" mb="$3">
            Staff Engineer at{" "}
            <Box as="span" fontWeight="$bold">
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
      <Box as="section" mb="$8">
        <Box
          as="h2"
          type={{ _: "$3xl", sm: "$4xl" }}
          fontWeight="$bolder"
          mb="$6"
        >
          Featured Projects
        </Box>
        <Box
          display="grid"
          gap="$4"
          gridTemplateColumns={{ sm: "1fr 1fr 1fr" }}
        >
          <ProjectCard
            href="https://github.com/roginfarrer/react-collapsed"
            title="react-collapsed"
            desc="React custom hook for creating animated and accessible expand/collapse components"
            repo="roginfarrer/react-collapsed"
          />
          <ProjectCard
            href="https://github.com/wayfair/rainbow-sprinkles"
            title="Rainbow Sprinkles"
            desc="Dynamic, theme-driven style props for Vanilla Extract."
            repo="wayfair/rainbow-sprinkles"
          />
          <ProjectCard
            href="https://github.com/system-props/system-props"
            title="System Props"
            desc="Responsive, theme-based, and typed style props for React."
            repo="system-props/system-props"
          />
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-evenly"
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
