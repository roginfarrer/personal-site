import React from "react";
import Box from "./Box";
import Stack from "./Stack";
import Link from "./Link";
import Image from "next/image";

export function SiteHeaderBio() {
  return (
    <>
      <Box
        display="grid"
        gridGap={[3, , 4]}
        gridTemplateColumns={["auto", "1fr 1.5fr", "auto"]}
        gridTemplateAreas={[
          "'name name' 'pic pic' 'bio bio' 'links links'",
          "'name name' 'pic bio' 'links links'",
          "'name name' 'pic bio' 'links links'",
          "'name name' 'pic bio' 'pic links'",
          "'name name' 'pic pic' 'bio bio' 'links links'",
        ]}
      >
        <Box
          textAlign="center"
          fontFamily="serif"
          as="h1"
          fontSize={4}
          gridArea="name"
        >
          Rogin Farrer
          <Box mt={-2} as="span" display="block" fontSize={3} color="grays.0">
            Software Engineer
          </Box>
        </Box>
        <Box
          gridArea="pic"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            width="clamp(200px, 100%, 250px)"
            clipPath="polygon(25% 2%,101% 15%,88% 86%,32% 95%,2% 67%)"
          >
            <Image
              height={400}
              width={400}
              alt="Rogin smiling"
              src="/images/avatar-cropped.jpg"
            />
          </Box>
        </Box>
        <Box gridArea="bio" display="flex" alignItems="center">
          <Box as="p">
            I'm a Software Engineer building <i>design systems</i> at Wayfair in
            Boston. Most days you can find me neck-deep in React, Node.js, CSS,
            and a cup of coffee.
          </Box>
        </Box>
        <Stack as="ul" ml={3} gap="-2px" gridArea="links">
          <ExternalItem emoji="💻">
            Review my pull requests on&nbsp;
            <Link
              openInNewWindow
              external
              href="https://github.com/roginfarrer"
            >
              Github
            </Link>
          </ExternalItem>
          <ExternalItem emoji="🦉">
            Follow me on&nbsp;
            <Link
              openInNewWindow
              external
              href="https://twitter.com/roginfarrer"
              _target="blank"
            >
              Twitter
            </Link>
          </ExternalItem>
          <ExternalItem emoji="💼">
            Connect with me on&nbsp;
            <Link
              openInNewWindow
              external
              href="https://www.linkedin.com/in/roginfarrer/"
            >
              LinkedIn
            </Link>
          </ExternalItem>
        </Stack>
      </Box>
    </>
  );
}

function ExternalItem({ emoji, children }) {
  return (
    <Box as="li" display="flex" alignItems="center">
      <Box aria-hidden="true" as="span" mr={3} fontSize={3}>
        {emoji}
      </Box>
      <span>{children}</span>
    </Box>
  );
}
