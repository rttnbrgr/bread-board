import { useState } from "react";
import {
  Box,
  BoxProps,
  Button,
  Stack,
  Text,
  TextProps,
  StackProps,
  IconButton,
  Input
} from "@chakra-ui/react";
import { PlaceItem } from "./PlaceItem";
import { AffordanceItem } from "./AffordanceItem";
// import { SmallCloseIcon } from "@chakra-ui/icons";

export type PlaceProps = {
  title: string;
  items: string[] | null;
  handlePlace?: (e?: any) => void;
  handleAffordance?: () => void;
};

type PlaceStackProps = StackProps & PlaceProps;

export const PlaceStack = ({
  title,
  items,
  handlePlace = () => {
    console.log("place click");
  },
  handleAffordance = () => {
    console.log("Affordance click");
  },
  ...props
}: PlaceStackProps) => {
  return (
    <Stack spacing="0" alignItems={"flex-start"}>
      <PlaceItem onClick={handlePlace}>{title}</PlaceItem>
      {/* {items &&
        items.map((item, i) => (
          <AffordanceItem key={i} onClick={handleAffordance}>
            {item}
          </AffordanceItem>
        ))} */}
      {/* Add new affordance */}
      {/* <Box pl="2">
        <Button size="xs">Add</Button>
      </Box> */}
    </Stack>
  );
};

export default PlaceStack;
