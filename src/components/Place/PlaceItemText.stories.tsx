import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PlaceItemText } from "./PlaceItemText";

export default {
  title: "Breadboard/PlaceItem",
  component: PlaceItemText,
} as ComponentMeta<typeof PlaceItemText>;

// this is not working for the default value
const defaultProps = {
  onClick: () => {
    console.log("hey");
  },
  children: "This is the place",
};

export const PlaceItemStory: ComponentStory<typeof PlaceItemText> = (
  props = defaultProps
) => <PlaceItemText {...props} {...defaultProps} />;

PlaceItemStory.storyName = "PlaceItem";
