import { vars } from "vars.css";
import { Box, BoxProps } from "./Box";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { ComponentProps } from "react";

export interface ChipProps {
  icon: ComponentProps<typeof Icon>["icon"];
  children: string;
  iconColor?: BoxProps<any>["color"];
}

export function Chip({ icon, children, iconColor }: ChipProps) {
  return (
    <Box
      display="flex"
      gap="$2"
      borderRadius="50vw"
      alignItems="center"
      border={`1px solid ${vars.colors.gray7}`}
      py="$1"
      px="$2"
      type="$sm"
    >
      <Box as={Icon} icon={icon} color={iconColor} size="15px" />
      {children}
    </Box>
  );
}
