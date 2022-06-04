import { Box, BoxProps } from "./Box";
import NextLink from "next/link";

export interface LinkProps extends BoxProps<"a"> {
  openInNewWindow?: boolean;
}

function Link({
  openInNewWindow = false,
  href,
  children,
  ...props
}: LinkProps) {
  const sharedProps = {
    target: openInNewWindow ? "_blank" : null,
    href,
  };

  return href.startsWith("/") ? (
    <NextLink {...sharedProps} passHref href={href}>
      <Box as="a" {...props}>
        {children}
      </Box>
    </NextLink>
  ) : (
    <Box as="a" rel="noreferrer" {...sharedProps} {...props}>
      {children}
    </Box>
  );
}

export default Link;
