import { Styles } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

export const styles: Styles = {
  global: {
    body: {
      fontFamily: "body",
      // color: "chakra-body-bg",
      // bg: "chakra-body-text",
      transitionProperty: "background-color",
      transitionDuration: "normal",
      lineHeight: "base"
    },
    "*::placeholder": {
      color: "chakra-placeholder-color"
    },
    "*, *::before, &::after": {
      borderColor: "chakra-border-color",
      wordWrap: "break-word"
    }
  }
};

// 2. Extend the theme to include custom colors, fonts, etc
// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// }

export const theme = extendTheme({ styles });
