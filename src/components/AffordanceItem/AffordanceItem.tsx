import { useState } from "react";
import { Text, IconButton } from "@chakra-ui/react";
import { PlaceItemProps } from "../PlaceItem";
import { SmallCloseIcon } from "@chakra-ui/icons";

export const AffordanceItem = ({ children, onClick }: PlaceItemProps) => {
  return (
    <Text borderLeft="2px solid black" px="2" py="2">
      {children}
      <IconButton
        aria-label="Remove"
        variant="ghost"
        colorScheme="gray"
        onClick={onClick}
        icon={<SmallCloseIcon />}
      />
    </Text>
  );
};
