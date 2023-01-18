import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AffordanceItem } from "./AffordanceItem";

export default {
  title: "Breadboard/AffordanceItem",
  component: AffordanceItem
} as ComponentMeta<typeof AffordanceItem>;

// this is not working for the default value
const defaultProps = {
  onClick: () => {
    console.log("hey");
  },
  children: "This is the place"
};

export const AffordanceItemStory: ComponentStory<typeof AffordanceItem> = (
  props = defaultProps
) => <AffordanceItem {...props} {...defaultProps} />;

AffordanceItemStory.storyName = "AffordanceItem";
