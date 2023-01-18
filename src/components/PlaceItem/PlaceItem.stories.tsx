import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PlaceItem } from "./PlaceItem";

export default {
  title: "Breadboard/PlaceItem",
  component: PlaceItem
} as ComponentMeta<typeof PlaceItem>;

// this is not working for the default value
const defaultProps = {
  onClick: () => {
    console.log("hey");
  },
  children: "This is the place"
};

export const PlaceItemStory: ComponentStory<typeof PlaceItem> = (
  props = defaultProps
) => <PlaceItem {...props} {...defaultProps} />;

PlaceItemStory.storyName = "PlaceItem";
