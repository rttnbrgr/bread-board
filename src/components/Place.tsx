import { useState } from "react";
import {
  Box,
  BoxProps,
  Button,
  Stack,
  Text,
  TextProps,
  StackProps
} from "@chakra-ui/react";
import { mockPlaceArray } from "../mock";

const PlaceItem = ({ children }: TextProps) => {
  return (
    <Text bg="black" color="white" py="2" px="2">
      {children}
    </Text>
  );
};

const AffordanceItem = ({ children }: TextProps) => {
  return (
    <Text borderLeft="2px solid black" px="2" py="2">
      {children}
    </Text>
  );
};

type PlaceProps = {
  title: string;
  items: string[] | null;
};

type PlaceStackProps = StackProps & PlaceProps;

const PlaceStack = ({ title, items, ...props }: PlaceStackProps) => {
  return (
    <Stack spacing="0" alignItems={"flex-start"}>
      <PlaceItem>{title}</PlaceItem>
      {items &&
        items.map((item, i) => <AffordanceItem key={i}>{item}</AffordanceItem>)}
      {/* Add new affordance */}
      <Box pl="2">
        <Button size="xs">Add</Button>
      </Box>
    </Stack>
  );
};

export default PlaceStack;
