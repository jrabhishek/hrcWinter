import { createMuiTheme } from "@material-ui/core/styles";

export const pxToRem = (px) => `${px / 22.5}rem`;
export const pxToVw = (px) =>
  `${(100 / document.documentElement.clientWidth) * px}vw`;

export const pxToVh = (px) =>
  `${px / (document.documentElement.clientHeight * 0.01)}vh`;
export const ff = (px) => {
  return px / 22.5;
};

export default createMuiTheme({
  palette: {
    primary: {
      main: "#1B1F38",
      light: "#58687E",
      dark: "rgb(93,175,240,0.2)",
      textMain: "rgba(255, 255, 255, 1)",
    },
  },
  main: {
    text: "rgba(255, 255, 255, 1)",
  },
});
