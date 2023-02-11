import { useState } from "react";
import {
  Box,
  BoxProps,
  Button,
  Stack,
  Text,
  TextProps,
  StackProps,
  IconButton as ChakraIconButton,
  Input,
  HStack,
  IconButtonProps,
} from "@chakra-ui/react";

export const IconButton = (props: IconButtonProps) => (
  <ChakraIconButton variant="ghost" size="sm" {...props} />
);
