import { useContext } from "react";
import { ColorModeContext } from "../pages/_app";
import { ReplContext } from "../pages/_context";
import { TextField } from "@mui/material";
import { grey } from "@mui/material/colors";

export const ReplResult = () => {
  const { colorMode } = useContext(ColorModeContext);
  const isDarkMode = colorMode === "dark";

  const { evaluationResult } = useContext(ReplContext);

  const styles = {
    "& .MuiOutlinedInput-root": {
      height: "100%",
      alignItems: "flex-start",
      "& fieldset": {
        borderColor: "transparent",
      },
      "&:hover fieldset": {
        borderColor: "transparent",
      },
      "&.Mui-focused fieldset": {
        borderColor: isDarkMode ? grey[700] : grey[200],
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
  };

  return (
    <TextField
      sx={{
        ...styles,
        width: "100%",
        padding: 0,
      }}
      multiline={true}
      aria-readonly={true}
      autoCapitalize={"off"}
      autoCorrect={"off"}
      autoComplete={"off"}
      variant={"outlined"}
      value={evaluationResult}
    />
  );
};
