import { Box, BoxProps, Text, TextProps } from "@chakra-ui/react";

const boxStyles: BoxProps = {
  h: "8",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid black",
  px: "2",
};

const textStyles: TextProps = {
  fontSize: "sm",
};

export const AffordanceItemText = ({ children, ...boxProps }: BoxProps) => {
  return (
    <Box {...boxStyles} {...boxProps}>
      <Text {...textStyles}>{children}</Text>
    </Box>
  );
};
