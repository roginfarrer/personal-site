import { Box } from "../components/Box";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useDarkMode } from "usehooks-ts";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

function NavItem({ children, href }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <NextLink passHref href={href}>
      <Box
        as="a"
        fontWeight={isActive ? "bold" : undefined}
        bg={{ hover: "$gray4" }}
        borderRadius="$md"
        px="$4"
        py="$2"
        color="$gray12"
      >
        {children}
      </Box>
    </NextLink>
  );
}

export function Header() {
  const { isDarkMode, toggle } = useDarkMode();

  return (
    <Box as="nav" display="flex" gap="$4">
      <NavItem href="/">Home</NavItem>
      <NavItem href="/blog">Blog</NavItem>
      <Box
        as="button"
        onClick={toggle}
        borderRadius="$md"
        p="$2"
        bg={{ hover: "$gray4" }}
        size="32px"
        display="flex"
        placeItems="center"
        ml="auto"
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </Box>
    </Box>
  );
}
