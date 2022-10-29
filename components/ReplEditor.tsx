import Editor from '@monaco-editor/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import initSwc, { Options, transformSync } from '@swc/wasm-web';
import { invoke } from '@tauri-apps/api/tauri';
import { ColorModeContext } from '../pages/_app';
import { ReplContext } from '../pages/_context';

export const ReplEditor = () => {
  const { colorMode } = useContext(ColorModeContext);
  const isDarkMode = colorMode === "dark";

  const { setEvaluationResult } = useContext(ReplContext);

  const [initialized, setInitialized] = useState(false);
  const [input, setInput] = useState("");

  const execScript = useCallback(async () => {
    if (!initialized) {
      return;
    }

    try {
      const transformOptions: Options = {
        module: {
          type: "es6",
          strict: false,
          strictMode: false,
        },
        jsc: {
          target: "es5",
          parser: {
            syntax: "typescript",
          },
        },
      };

      const { code } = transformSync(input, transformOptions);
      const result = await invoke("eval", { code: code });
      console.log("Result:", result);

      if (result) {
        setEvaluationResult(JSON.stringify(result));
      } else {
        setEvaluationResult("");
      }
    } catch (err) {
      if (typeof err === "string") {
        setEvaluationResult(err as string);
      } else if (err instanceof Error) {
        setEvaluationResult(err.message);
      }
    }
  }, [input, initialized, setEvaluationResult]);

  useEffect(() => {
    (async () => {
      await execScript();
    })();
  }, [input, execScript]);

  useEffect(() => {
    (async () => {
      await initSwc();
      setInitialized(true);
    })();
  }, []);

  return (
    <Editor
      width="100%"
      language="typescript"
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
  )
}