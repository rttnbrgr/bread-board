import { useState } from "react";
import { Box, Text, TextProps, IconButton } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

export type PlaceItemProps = TextProps & {
  onClick?: (e?: any) => void;
};

export const PlaceItem = ({ children, onClick }: PlaceItemProps) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Text bg="black" color="white" py="2" px="2">
        {children}
      </Text>
      <IconButton
        aria-label="Remove"
        variant="ghost"
        colorScheme="gray"
        onClick={onClick}
        icon={<SmallCloseIcon />}
      />
    </Box>
  );
};
