import type { NextPage } from "next";
import { useContext } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { ColorModeContext } from "./_app";
import { ReplContextProvider } from "./_context";
import { ReplEditor } from "../components/ReplEditor";
import { ReplResult } from "../components/ReplResult";

const Repl: NextPage = () => {
  const { toggleColorMode } = useContext(ColorModeContext);

  return (
    <ReplContextProvider>
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
            <ReplEditor />
          </Box>
          <Box flex={0.5}>
            <ReplResult />
          </Box>
        </Box>
      </Box>
    </ReplContextProvider>
  );
};

export default Repl;
