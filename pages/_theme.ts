import { PaletteMode } from "@mui/material";
import { amber, grey } from "@mui/material/colors";
import { PaletteOptions } from "@mui/material/styles/createPalette";
import { ThemeOptions } from '@mui/material/styles/createTheme';

const darkPalette: PaletteOptions = {
  primary: {
    main: "#16161d",
  },
  divider: amber[200],
  text: {
    primary: grey[500],
    secondary: grey[200],
  },
};

const lightPalette: PaletteOptions = {
  primary: {
    main: '#fff',
  },
  divider: amber[200],
  text: {
    primary: grey[500],
    secondary: grey[200],
  },
};

export function getDesignTokens(mode: PaletteMode): ThemeOptions {
  const palette = mode === 'light' ? lightPalette : darkPalette;
  return {
    palette: {
      mode,
      ...palette,
    },
    typography: {
      fontFamily: ["Recursive", "monospace"].join(","),
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
        },
      },
    },
  }
}
