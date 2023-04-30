import { Box } from "components/Box";
import Layout, { siteTitle } from "components/layout";
import Link, { LinkProps } from "components/Link";
import Head from "next/head";
import { ProjectCard } from "components/ProjectCard";
import { Chip } from "components/Chip";
import {
  faKeyboard,
  faCodeMerge,
  faScroll,
  faObjectGroup,
  faBookOpenReader,
  faDumbbell,
  faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";
import { vars } from "vars.css";
import Image from "next/image";
import propic from "../public/images/avatar-cropped.jpg";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Box
        display="grid"
        gap={`${vars.space[2]} ${vars.space[3]}`}
        gridTemplateColumns={{ sm: "1fr fr" }}
        gridTemplateRows={{ sm: "1fr 1fr" }}
        gridTemplateAreas={{
          _: "'pic pic' 'bio bio' 'chips chips'",
          sm: "'bio pic' 'bio pic' 'chips chips'",
        }}
        alignItems="center"
        mb="$6"
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
              priority
              as={Image}
              alt="Rogin drinking coffee"
              src={propic}
              size="auto"
            />
          </Box>
        </Box>
      </Box>
      <Box gridArea="chips" display="flex" gap="$3" flexWrap="wrap" mb="$7">
        <Chip icon={faKeyboard} iconColor="$blue9">
          Mechanical Keyboard Enthusiast
        </Chip>
        <Chip icon={faBookOpenReader} iconColor="$green9">
          Self Taught
        </Chip>
        <Chip icon={faCodeMerge} iconColor="$orange9">
          Open Source Maintainer
        </Chip>
        <Chip icon={faObjectGroup} iconColor="$purple9">
          Design Systems
        </Chip>
        <Chip icon={faPersonRunning} iconColor="$yellow10">
          Ultimate Frisbee
        </Chip>
        <Chip icon={faDumbbell} iconColor="$gray9">
          Weight-lifter
        </Chip>
        <Chip icon={faScroll} iconColor="$red9">
          History Nerd
        </Chip>
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
        <BottomLink href="https://hachyderm.io/@rogin">Mastodon</BottomLink>
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
