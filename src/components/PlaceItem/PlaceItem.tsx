import { Box, Text, BoxProps } from "@chakra-ui/react";
import React from "react";

export const PlaceItem = ({ children }: BoxProps) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Text bg="black" color="white" py="2" px="2">
        {children}
      </Text>
    </Box>
  );
};
