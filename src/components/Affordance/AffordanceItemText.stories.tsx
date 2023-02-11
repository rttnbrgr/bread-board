import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AffordanceItemText } from "./AffordanceItemText";

export default {
  title: "Breadboard/AffordanceItem",
  component: AffordanceItemText,
} as ComponentMeta<typeof AffordanceItemText>;

// this is not working for the default value
const defaultProps = {
  onClick: () => {
    console.log("hey");
  },
  children: "This is the place",
};

export const AffordanceItemStory: ComponentStory<typeof AffordanceItemText> = (
  props = defaultProps
) => <AffordanceItemText {...props} {...defaultProps} />;

AffordanceItemStory.storyName = "AffordanceItem";
