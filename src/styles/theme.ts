import { green, red, yellow } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#001EB9",
    },
    secondary: {
      main: "#162427",
    },
    success: {
      main: green[600],
    },
    warning: {
      main: yellow[700],
    },
    error: { main: red[600] },
  },
  typography: {
    fontFamily: "Poppins",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
})

export default theme
