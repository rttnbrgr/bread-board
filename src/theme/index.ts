import { Styles } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    border: "2px solid",
    // fontWeight: "bold",
    // textTransform: "uppercase",
    borderRadius: "none", // <-- border radius is same for all variants and sizes
  },

  // Two sizes: sm and md
  sizes: {
    md: {
      // Font styles here?
      fontSize: "md",
      lineHeight: "1",
      px: 1,
      py: 1,
      h: "7",
      // minW: "10",
    },
  },
  defaultProps: {
    size: "md",
    // variant: "outline",
  },
});

export const styles: Styles = {
  global: {
    body: {
      fontFamily: "body",
      // color: "chakra-body-bg",
      // bg: "chakra-body-text",
      transitionProperty: "background-color",
      transitionDuration: "normal",
      lineHeight: "base",
    },
    "*::placeholder": {
      color: "chakra-placeholder-color",
    },
    "*, *::before, &::after": {
      borderColor: "chakra-border-color",
      wordWrap: "break-word",
    },
  },
};

// 2. Extend the theme to include custom colors, fonts, etc
// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

export const theme = extendTheme({
  styles,
  components: {
    // Button,
  },
});
