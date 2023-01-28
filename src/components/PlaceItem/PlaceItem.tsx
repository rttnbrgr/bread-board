import { Box, Text, IconButton } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import React from "react";

export type PlaceItemProps = {
  onClick?: (e?: any) => void;
  children: React.ReactNode;
};

export const PlaceItem = ({ children, onClick }: PlaceItemProps) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Text bg="black" color="white" py="2" px="2">
        {children}
      </Text>
      {onClick && (
        <IconButton
          aria-label="Remove"
          variant="ghost"
          colorScheme="gray"
          onClick={onClick}
          icon={<SmallCloseIcon />}
        />
      )}
    </Box>
  );
};
