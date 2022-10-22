import type { NextPage } from "next";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";

const Home: NextPage = () => {
  const [result, setResult] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    execCurrent();
  }, [input]);

  async function execCurrent() {
    try {
      const result = await invoke("eval", { code: input });
      console.log("Result:", result);
      if (result) {
        setResult(JSON.stringify(result));
      }
    } catch (err) {
      setResult(err as string);
    }
  }

  const theme = {
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
        borderColor: "pink",
        borderRadius: 0,
      },
    },
  };

  return (
    <Box
      sx={{ height: "100vh", width: "100vw" }}
      display={"flex"}
      flexDirection={"column"}
    >
      <Box display={"flex"} gap={1} height={"100%"} flex={1}>
        <TextField
          sx={{ flex: 1, ...theme }}
          inputProps={{
            autoCapitalize: "off",
          }}
          multiline={true}
          autoCorrect={"off"}
          autoComplete={"off"}
          variant={"outlined"}
          placeholder={"Write here..."}
          onChange={(e) => setInput(e.target.value)}
        />
        <TextField
          sx={{
            flex: 1,
            ...theme,
          }}
          multiline={true}
          aria-readonly={true}
          autoCapitalize={"off"}
          autoCorrect={"off"}
          autoComplete={"off"}
          variant={"outlined"}
          value={result}
        />
      </Box>
    </Box>
  );
};

export default Home;
