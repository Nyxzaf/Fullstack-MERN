import { createTheme } from "@mui/material/styles";
import { B_COLOR, COLOR_2 } from "./colors.js";
const theme = createTheme({
  palette: {
    primary: {
      main: COLOR_2,
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: B_COLOR,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: ".85rem",
        },
      },
    },
  },
});

export default theme;
