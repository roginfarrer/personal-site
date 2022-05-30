import React from "react";
import { Box } from "./Box";

export function SiteHeaderBio() {
  return (
    <>
      <Box
        display="grid"
        gap="$3"
        // gridTemplateColumns={["auto", "1fr 1.5fr", "auto"]}
        gridTemplateColumns={{ _: "auto", md: "1fr fr" }}
        gridTemplateRows={{ md: "1fr 1fr" }}
        gridTemplateAreas={{ _: "'bio pic' 'bio pic'" }}
        alignItems="center"
      >
        <Box gridArea="bio">
          <Box as="h1" type="$4xl" fontWeight="bold" gridArea="name" mb="$2">
            Rogin Farrer
          </Box>
          <Box as="h2" type="$lg" mb="$3">
            Staff Engineer at Wayfair
          </Box>
          <Box display="flex" alignItems="center">
            <Box as="p">
              I'm a Software Engineer building <i>design systems</i> at Wayfair
              in Boston. Most days you can find me neck-deep in React, Node.js,
              CSS, and a cup of coffee.
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
            width="clamp(200px, 100%, 250px)"
            clipPath="polygon(25% 2%,101% 15%,88% 86%,32% 95%,2% 67%)"
          >
            <Box
              as="img"
              alt="Rogin smiling"
              src="/images/avatar-cropped.jpg"
            />
          </Box>
        </Box>
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
