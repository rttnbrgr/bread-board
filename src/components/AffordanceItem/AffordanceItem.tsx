import { useState } from "react";
import { Box, BoxProps, Text, TextProps } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { IconButton } from "../chakra";

const boxStyles: BoxProps = {
  h: "8",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid black",
};

const textStyles: TextProps = {
  // borderLeft: "2px solid black",
  // px: "2",
  // py: "2",
  fontSize: "sm",
};

type AffordanceItemProps = BoxProps & {
  onClick?: (e?: any) => void;
  children: React.ReactNode;
};

export const AffordanceItem = ({
  children,
  onClick,
  ...boxProps
}: AffordanceItemProps) => {
  const showIcon = !!onClick;
  return (
    <Box {...boxStyles} {...boxProps}>
      <Text {...textStyles}>
        {children}
        {showIcon && (
          <IconButton
            aria-label="Remove"
            onClick={onClick}
            icon={<CloseIcon />}
          />
        )}
      </Text>
    </Box>
  );
};
