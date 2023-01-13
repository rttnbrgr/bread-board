import { useState } from "react";
import {
  Box,
  BoxProps,
  Button,
  Stack,
  Text,
  TextProps,
  StackProps,
  IconButton
} from "@chakra-ui/react";
import { mockPlaceArray } from "../mock";
// import { SmallCloseIcon } from "@chakra-ui/icons";

type TextPropsPlusClick = TextProps & {
  onClick?: (e?: any) => void;
};

export const PlaceItem = ({ children, onClick }: TextPropsPlusClick) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Text bg="black" color="white" py="2" px="2">
        {children}
      </Text>
      <IconButton
        aria-label="Remove"
        onClick={onClick}
        // icon={<SmallCloseIcon />}
      />
      <Box onClick={onClick}>X</Box>
    </Box>
  );
};

export const AffordanceItem = ({ children, onClick }: TextPropsPlusClick) => {
  return (
    <Text borderLeft="2px solid black" px="2" py="2">
      {children}
      {/* <div onClick={onClick}>X</div> */}
    </Text>
  );
};

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
