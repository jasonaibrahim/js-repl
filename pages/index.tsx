import type { NextPage } from "next";
import { invoke } from "@tauri-apps/api/tauri";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppBar, Box, TextField, Toolbar, Typography } from "@mui/material";

import Editor from "@monaco-editor/react";
import { ColorModeContext } from "./_app";
import { grey } from "@mui/material/colors";

const Home: NextPage = () => {
  const { toggleColorMode, colorMode } = useContext(ColorModeContext);

  const [result, setResult] = useState("");
  const [input, setInput] = useState("");

  const isDarkMode = colorMode === "dark";

  const execScript = useCallback(async () => {
    try {
      const result = await invoke("eval", { code: input });
      console.log("Result:", result);
      if (result) {
        setResult(JSON.stringify(result));
      } else {
        setResult("");
      }
    } catch (err) {
      setResult(err as string);
    }
  }, [input]);

  useEffect(() => {
    (async () => {
      await execScript();
    })();
  }, [input, execScript]);

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
    <Box
      sx={{ height: "100vh", width: "100vw" }}
      display={"flex"}
      flexDirection={"column"}
    >
      <AppBar position="static">
        <Toolbar variant={"dense"}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={toggleColorMode}
          >
            JS Repl
          </Typography>
        </Toolbar>
      </AppBar>
      <Box display={"flex"} gap={1} height={"100%"} flex={1}>
        <Box flex={0.5}>
          <Editor
            width="100%"
            language="javascript"
            theme={isDarkMode ? "vs-dark" : "vs-light"}
            value={input}
            options={{
              scrollBeyondLastLine: false,
              scrollbar: {
                useShadows: false,
              },
            }}
            onChange={(newValue) => setInput(newValue ?? "")}
          />
        </Box>
        <TextField
          sx={{
            flex: 0.5,
            ...styles,
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
